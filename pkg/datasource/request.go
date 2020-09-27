package datasource

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	retry "github.com/avast/retry-go"
	"github.com/instana/instana-grafana-datasource/pkg/datasource/settings"
)

// RequestOptions represents the request options to use for a request
type RequestOptions struct {
	Method     string
	Path       string
	MaxRetries uint
}

// GetRequest does a GET against an Instana endpoint
func (instana *InstanaDataSource) GetRequest(settings settings.InstanaSettings, path string) (*json.RawMessage, error) {
	options := RequestOptions{
		Method: "GET",
		Path:   path,
	}

	return instana.DoRequest(settings, options)
}

// DoRequest performs a generic request against an Instana endpoint
func (instana *InstanaDataSource) DoRequest(settings settings.InstanaSettings, request RequestOptions) (*json.RawMessage, error) {
	opts := settings.Options
	url := fmt.Sprintf("%s%s", settings.Options.URL, request.Path)
	req, err := http.NewRequest(request.Method, url, nil)
	if err != nil {
		return nil, err
	}

	if !opts.UseProxy {
		req.Header.Set("Authorization", fmt.Sprintf("apiToken %s", opts.APIToken))
	}

	var body []byte
	client := settings.Client
	err = retry.Do(func() error {
		response, err := client.Do(req)
		if err != nil {
			return err
		}

		if response.StatusCode == 429 {
			return retry.Unrecoverable(errors.New("API limit is reached"))
		}

		if response.StatusCode >= 400 && response.StatusCode < 500 {
			return fmt.Errorf("the API request failed with status code %v", response.StatusCode)
		}

		if response.StatusCode >= 500 {
			return retry.Unrecoverable(fmt.Errorf("the API request failed with status code %v", response.StatusCode))
		}

		body, err = ioutil.ReadAll(response.Body)
		if err != nil {
			return err
		}

		return nil
	}, retry.Attempts(request.MaxRetries))

	if err != nil {
		return nil, err
	}

	res := &json.RawMessage{}
	err = json.Unmarshal(body, res)
	if err != nil {
		return nil, err
	}

	return res, nil
}
