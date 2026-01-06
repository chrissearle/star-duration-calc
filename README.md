# Star Duration Calculator

Simple calculator to give the maximum exposure time for a given focal length and a given pixel size to avoid streaking.

- Arc Minutes per mm of sensor = 3438 / focal length
- Arc Seconds per mm of sensor = Arc Minutes per mm of sensor \* 60
- Arc Seconds per pixel = Arc Seconds per mm of sensor \* pixel size in mm
- Max duration in seconds = Arc Seconds per pixel / 15
