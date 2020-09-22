import React, { useRef, useState } from "react";

import { Map, FeatureGroup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet"

import "./assets/leaflet.css"
import "./assets/leaflet.draw.css"

// Material components
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    map: ({
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
    headerWrapper: {
        zIndex: 1,
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
    }
}));

export const MapDraw = (props) => {

    const classes = useStyles(props)
    const editRef = useRef();

    //use states to enable the button clicks at special times, also you can use states 
    //to perform multiple actions with one button

    const [drawing, setDrawing] = useState(false);

    const handleClick = () => {
        
        //Edit this method to perform other actions

        if (!drawing) {
            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()
        } else {
            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
            editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()
        }
        setDrawing(!drawing)
    }

    //Overview of methods you can use to access the toolbars handler for polygon drawing

        // startDraw
        //editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.enable()

        // cancelDraw 
        //editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()

        // vertexBack 
        //editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.deleteLastVertex()

        // stopDraw 
        //editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.completeShape()
        //editRef.current.leafletElement._toolbars.draw._modes.polygon.handler.disable()

        // startEdit 
        //editRef.current.leafletElement._toolbars.edit._modes.edit.handler.enable()

        // cancelEdit 
        //editRef.current.leafletElement._toolbars.edit._modes.edit.handler.disable()

        // saveEdit
        //editRef.current.leafletElement._toolbars.edit._modes.edit.handler.save() 
        //editRef.current.leafletElement._toolbars.edit._modes.edit.handler.disable()
        
        // startDelete 
        //editRef.current.leafletElement._toolbars.edit._modes.remove.handler.enable()

        // saveDelete 
        //editRef.current.leafletElement._toolbars.edit._modes.remove.handler.save()
        //editRef.current.leafletElement._toolbars.edit._modes.remove.handler.disable()

    
    //example methods from section 4

    //uncomment next line to change the default tooltip text
    //L.drawLocal.draw.handlers.polygon.tooltip.start = "This is an modified tooltip text"

    //to delete handlers to avoid draw on right clicks implement onHandleMapReady function
    //there you call layer.off('**name of the handler**')

    const onShapeDrawn = (e) => {
        setDrawing(false)

        e.layer.on('click', () => {
            editRef.current.leafletElement._toolbars.edit._modes.edit.handler.enable()
        })
        e.layer.on('contextmenu', () => {
            //do some contextmenu action here
        })
        e.layer.bindTooltip("Text", 
            {
              className: 'leaflet-draw-tooltip:before leaflet-draw-tooltip leaflet-draw-tooltip-visible',
              sticky: true,
              direction: 'right'
            }
        );
    }

    
    return (
        <div>
            <div className={classes.headerWrapper}>
                <h1> Custom button react-leaflet-draw Demo </h1>
            </div>
            
            <Map 
            center={[51.515, -0.09]} 
            zoom={8}
            zoomControl={true}  
            className={classes.map} >

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />

                <FeatureGroup >
                    <EditControl
                    ref={editRef}
                    position='topright'
                    onCreated={onShapeDrawn}
                    //here you can specify your shape options and which handler you want to enable
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
