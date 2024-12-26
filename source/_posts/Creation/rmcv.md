---
title: rmcv - Computer Vision Library for Robomaster
mathjax: true
date: 2022-06-12 08:00:00
tags: 
  - Robomaster
  - Computer Vision
  - OpenCV
categories: Creation
---

![Award](award.jpeg "Award")

This project is a library for RoboMaster computer vision based on OpenCV. The functions that currently implemented includes:

- DaHeng industrial camera driver
- Image preprocessing
- Pattern matching for light blob and armour
- Serial port communication
- Gravity compensation

![practical_training](rmcv.jpeg "Practical Training")

![practical_training](rmcv.mov "Practical Training")

> The movement prediction in this video is based on a simple Kalman Filter running on STM32 lower computer.

Source Code: [rmcv on Github](https://github.com/deemoe404/rmcv)

## Recent Updates

- Aug 24, 2024: Added foundation for Movement Prediction, including a simple Kalman Filter and Object Classification/Tracking using SVM.
