{
    init: function(elevators, floors) {
        let FLOOR_COUNT = floors.length;
        let LOAD_FACTOR_THRESH = 0.5;
        let direction = 1;
        let requestHistogram = new Array(FLOOR_COUNT).fill(0);
        
        function SetPressedBehaviors(floor){
            floor.on("up_button_pressed", function() {
                requestHistogram[floor.floorNum()]++;
            });
            
            floor.on("down_button_pressed", function() {
                requestHistogram[floor.floorNum()]++;
            });
        }
        
        function SetIdleBehavior(elevator) {
            elevator.on("idle", function() {
                
                if (elevator.loadFactor() > LOAD_FACTOR_THRESH) {
                    let pressedFloor = elevator.getPressedFloors()[0];
                    requestHistogram[pressedFloor] = 0;
                    elevator.goToFloor(pressedFloor);
                }
                else {
                    // Base behavior if no other checks hit.
                    let nextFloor = requestHistogram.indexOf(Math.max())

                    var max = 0;
                    var maxIndex = 0;
                    
                    for (var i = 0; i < requestHistogram.length; i++){
                        if (requestHistogram[i] > max) {
                            maxIndex = i;
                            max = requestHistogram[i];
                        }
                    }
                    
                    requestHistogram[maxIndex] = 0;
                    elevator.goToFloor(maxIndex);    
                }
                
            });
        }
        
        floors.map(SetPressedBehaviors);
        elevators.map(SetIdleBehavior);
    },
        
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    },
}
