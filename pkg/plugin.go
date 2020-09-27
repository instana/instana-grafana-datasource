package main

import (
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"

	ds "github.com/instana/instana-grafana-datasource/pkg/datasource"
)

// newDatasource returns datasource.ServeOpts.
func newDatasource() datasource.ServeOpts {
	// creates a instance manager for your plugin. The function passed
	// into `NewInstanceManger` is called when the instance is created
	// for the first time or when a datasource configuration changed.
	im := datasource.NewInstanceManager(ds.NewInstanceCallback)
	ds := ds.New(im)

	return datasource.ServeOpts{
		QueryDataHandler:    ds,
		CallResourceHandler: ds,
		CheckHealthHandler:  ds,
	}
}
