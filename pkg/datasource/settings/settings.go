package settings

import (
	"encoding/json"
	"fmt"
	"net/http"

	backend "github.com/grafana/grafana-plugin-sdk-go/backend"
)

// InstanaSettings extends DataSourceInstanceSettings with the
// Instana Specific Settings
type InstanaSettings struct {
	*backend.DataSourceInstanceSettings
	Options *InstanaOptions
	Client  *http.Client
}

// InstanaOptions is the parse Instana specific options for talking to the API
type InstanaOptions struct {
	URL                              string `json:"url"`
	APIToken                         string `json:"apiToken"`
	UseProxy                         bool   `json:"useProxy"`
	ShowOffline                      bool   `json:"showOffline"`
	AllowSLO                         bool   `json:"allowSlo"`
	QueryIntervalLimitInfra          int    `json:"queryinterval_limit_infra"`
	QueryIntervalLimitAppMetrics     int    `json:"queryinterval_limit_app_metrics"`
	QueryIntervalLimitAppCalls       int    `json:"queryinterval_limit_app_calls"`
	QueryIntervalLimitWebsiteMetrics int    `json:"queryinterval_limit_website_metrics"`
}

// From converts a generic settings struct into InstanaSettings
func From(settings *backend.DataSourceInstanceSettings) (*InstanaSettings, error) {
	options := InstanaOptions{}
	err := json.Unmarshal(settings.JSONData, &options)
	if err != nil {
		return nil, fmt.Errorf("Failed to parse Instana settings: %s", err)
	}

	instanaSettings := &InstanaSettings{settings, &options, &http.Client{}}
	return instanaSettings, nil
}
