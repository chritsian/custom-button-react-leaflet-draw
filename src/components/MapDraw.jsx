import React, { useRef, useEffect, useState } from "react";

import { Map, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

// react leaflet draw styles
//import "./assets/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw-src.css"

// Material components
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    map: (props) => ({
        height: `calc(90vh - 90px)`,
        width: '60%',
        zIndex: 0
    }),
    bottomBtnWrapper: {
        zIndex: 1,
        position: "absolute",
        bottom: theme.spacing(2),
        marginLeft: "30%",
        marginBottom: "8%",
        transform: "translateX(-50%)",
      },
}));

export const MapDraw = (props) => {

    //refs
    const map = useRef();
    const editControl = useRef();
    const [drawing, setDrawing] = useState(false);
    const classes = useStyles(props)

    const handleClick = () => {
        if (drawing) {
            editControl.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
        } else {
            editControl.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()
        }
        setDrawing(!drawing)
    }

    return (
        <div>
            <h1> Customize react-leaflet-draw Demo </h1>
            
            <Map 
            ref={map} 
            center={[51.515, -0.09]} 
            zoom={8} 
            zoomControl={true}  
            className={classes.map} >
                <FeatureGroup >
                    <EditControl
                    ref={editControl}
                    position='topright'
                    draw={{
                        rectangle: false,
                        circle: false,
                        polyline: false,
                        circlemarker: false,
                        marker: false,
                        polygon: {
                            allowIntersection: false,
                            shapeOptions: {
                                color: "#ff0000"
                            },
                        }
                    }}
                    />
                </FeatureGroup>
                <ReactLeafletGoogleLayer
                    useGoogMapsLoader={true}
                    type={"roadmap"}/>
                
            </Map>

            <div className={classes.bottomBtnWrapper}>
                <Button 
                    variant="contained"
                    onClick={handleClick}>
                    
                    {drawing ? "Cancel" : "Start Draw"}
                </Button>
            </div>
            
        </div>
            
    )};

export default MapDraw;
