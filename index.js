import Drawing from 'dxf-writer';
import { Color, LineBasicMaterial, MeshBasicMaterial } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

// Create grid and axes
viewer.grid.setGrid();
viewer.axes.setAxes();

let allPlans;
let model;

async function loadIfc(url) {
		// Load the model
    model = await viewer.IFC.loadIfcUrl(url);
		// Add dropped shadow and post-processing efect
    await viewer.shadowDropper.renderShadow(model.modelID);

    viewer.dimensions.active = true;
    viewer.dimensions.previewActive = true;

    window.ondblclick = () => {
      viewer.dimensions.create();
    }

    window.onkeydown = (event) => {
      if(event.code == 'Delete') {
        viewer.dimensions.delete();
      }
    }

  }

loadIfc('./02.ifc'); 
