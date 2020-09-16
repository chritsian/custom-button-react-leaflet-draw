import React, { useRef, useState } from "react";

import { Map, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

import "leaflet-draw/dist/leaflet.draw-src.css"

// Material components
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    map: (props) => ({
        height: `calc(90vh - 90px)`,
        width: '60%',
        zIndex: 0
    }),
    buttonWrapper: {
        zIndex: 1,
        position: "absolute",
        bottom: theme.spacing(2),
        marginLeft: "30%",
        marginBottom: "8%",
        transform: "translateX(-50%)",
    },
}));

export const MapDraw = (props) => {

    const classes = useStyles(props)
    const editControl = useRef();

    //use states to enable the button clicks at special times, also you can use states 
    //to perform multiple actions with one button

    const [drawing, setDrawing] = useState(false);
    

    const handleClick = () => {
        
        //Edit this method to perform other actions

        if (!drawing) {
            editControl.current.leafletElement._toolbars.draw._modes.rectangle.handler.enable()
        } else {
            editControl.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
            editControl.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
        }
        setDrawing(!drawing)
    }

    return (
        <div>
            <h1> Custom button react-leaflet-draw Demo </h1>
            
            <Map 
            center={[51.515, -0.09]} 
            zoom={8}
            zoomControl={true}  
            className={classes.map} >
                <FeatureGroup >
                    <EditControl
                    ref={editControl}
                    position='topright'

                    //here you can specify your shape options and which handler you want to enable
                    draw={{
                        rectangle: true,
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

            <div className={classes.buttonWrapper}>
                <Button 
                    variant="contained"
                    onClick={handleClick}>
                    
                    {
                        //display the correct text regarding the state
                        drawing ? "Save draw" : "Start draw" 
                    
                    }
                </Button>
            </div>
            
        </div>
            
    )};

export default MapDraw;
