package datasource

import (
	"context"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

// CallResource implements resource handler to allow frontend to query backend details
func (instana *InstanaDataSource) CallResource(ctx context.Context, req *backend.CallResourceRequest, sender backend.CallResourceResponseSender) error {

	return nil
}
