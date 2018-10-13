install:
yarn global add file:$PWD

xrandr example output
```sh
Screen 0: minimum 8 x 8, current 1920 x 1080, maximum 32767 x 32767
eDP1 connected (normal left inverted right x axis y axis)
   960x540       59.82  
   864x486       60.00    59.92    59.57  
   640x480       59.94  
DP1 disconnected (normal left inverted right x axis y axis)
HDMI1 disconnected (normal left inverted right x axis y axis)
HDMI2 connected primary 1920x1080+0+0 (normal left inverted right x axis y axis) 530mm x 300mm
   1920x1080     60.00*+
   1680x1050     59.88  
   1280x1024     75.02    60.02  
   1440x900      59.90  
   1280x960      60.00  
   1280x800      59.91  
   1152x864      75.00  
   1280x720      60.00  
   1024x768      75.03    70.07    60.00  
   832x624       74.55  
   800x600       72.19    75.00    60.32    56.25  
   640x480       75.00    72.81    66.67    59.94  
   720x400       70.08  
VIRTUAL1 disconnected (normal left inverted right x axis y axis)
```

// displays = DP1 eDP1 HDMI1 HDMI2 VIRTUAL1
// eDP1  = internal
// HDMI2 = hdmi output

xrandr example input
```sh
xrandr \
--output HDMI2 --primary --mode 1920x1080 --pos 0x0 --rotate normal \
--output HDMI1 --off \
--output DP1 --off \
--output eDP1 --off \
--output VIRTUAL1 --off
```

config example
```json
{
    "display": {
        "preferred": "externalOnly",
        "fallback": "internalOnly",
        "settings": {
            "externalOnly": [
                { "name": "HDMI2", "primary": true, "mode": "1920x1080" }
            ],
            "internalOnly": [
                { "name": "eDP1", "primary": true, "mode": "1920x1080_60.00" }
            ]
        }
    }
}
```
commands
--restore   set preferred config