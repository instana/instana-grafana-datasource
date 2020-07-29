import React from 'react';

interface FreeTextMetricsState {}

interface Props {
  query: InstanaQuery;
  onRunQuery(): void;
  onChange(value: InstanaQuery): void;
}

export class FreeTextMetrics extends React.Component<Props, FreeTextMetricsState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { query } = this.props;

    return (
      <div className={'gf-form'}>
         FreeTextMetricsState
      </div>
    );
  }
}
