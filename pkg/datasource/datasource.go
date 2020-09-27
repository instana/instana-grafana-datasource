package datasource

import (
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/instana/instana-grafana-datasource/pkg/datasource/settings"
)

// InstanaDataSource is the grafana backend datasource for Instana
type InstanaDataSource struct {
	im instancemgmt.InstanceManager
}

// NewInstanceCallback returns instana settings for a given backend settings
func NewInstanceCallback(setting backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
	return settings.From(&setting)
}

// New returns a new InstanaDataSource
func New(im instancemgmt.InstanceManager) *InstanaDataSource {
	return &InstanaDataSource{
		im: im,
	}
}
