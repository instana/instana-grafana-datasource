package datasource

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/instana/instana-grafana-datasource/pkg/datasource/settings"
)

type instanaHealth struct {
	health   string
	messages []string
}

// CheckHealth handles health checks sent from Grafana to the plugin.
func (instana *InstanaDataSource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	log.DefaultLogger.Info("CheckHealth", "request", req)
	instance, err := instana.im.Get(req.PluginContext)
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Issue reading Instana Settings: %s.", err),
		}, nil
	}
	settings, valid := instance.(settings.InstanaSettings)
	if !valid {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Issue reading Instana Settings. Unknown Error."),
		}, nil
	}

	log.DefaultLogger.Info("CheckHealth", "url", settings.Options.URL, "hasToken", settings.Options.APIToken != "")
	res, err := instana.GetRequest(settings, "/api/instana/health")
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Issue connecting to Instana: %s.", err),
		}, nil
	}

	health := &instanaHealth{}
	err = json.Unmarshal(*res, health)
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Invalid response from Instana: %s.", err),
		}, nil
	}

	if health.health == "RED" {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Instana reporting not healthy. Health: %s; Messages: [%s].", health.health, strings.Join(health.messages, ", ")),
		}, nil
	}

	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "Successfully connected to the Instana API.",
	}, nil
}
