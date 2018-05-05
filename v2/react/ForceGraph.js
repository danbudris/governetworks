import React from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

<ForceGraph zoom simulationOptions={{ height: 300, width: 300 }}>
  <ForceGraphNode node={{ id: 'first-node' }} fill="red" />
  <ForceGraphNode node={{ id: 'second-node' }} fill="blue" />
  <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
  <line x1={150} y1={0} x2={150} y2={300} zoomable stroke="green" />
</ForceGraph>