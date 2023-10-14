---
title: Compile Latest OpenCV on Ubuntu
mathjax: true
date: 2020-04-07 12:50:00
tags: 
  - Ubuntu
  - OpenCV
categories: Technology
---

Compiling OpenCV can vary depending on the platform. In this demonstration, I will be using Ubuntu. However, these steps are mostly the same for any other distribution, with the only differences being the package manager and the package names.

## Retrieve OpenCV source code

This shell command retrieve the most recent OpenCV version number from the GitHub API and store it in a shell variable for future use.

```bash
vernum=$(wget -qO- -t1 -T2 "https://api.github.com/repos/opencv/opencv/releases/latest"  grep "tag_name"  head -n 1  awk -F ":" '{print $2}'  sed 's/\"//g;s/,//g;s/ //g;s/v//g')
```

Next, download and unzip the OpenCV source code from GitHub. To avoid cluttering the working directory, it's recommended to create a new folder specifically for the compilation process.

```bash
mkdir opencv_build && cd opencv_build
```

```bash
wget https://github.com/opencv/opencv/archive/refs/tags/$vernum.zip
unzip $vernum.zip && rm $vernum.zip

wget https://github.com/opencv/opencv_contrib/archive/refs/tags/$vernum.zip
unzip $vernum.zip && rm $vernum.zip

cd opencv-$vernum
```

## Install dependencies

Before proceeding, make sure to update your system.

```bash
sudo apt update && sudo apt upgrade
```

The commands for installing the following packages include libraries that are commonly used with OpenCV, such as **v4l**, **FFMPEG**, and **x264**, but do not include GPU acceleration or machine learning components.

```bash
sudo add-apt-repository "deb http://security.ubuntu.com/ubuntu xenial-security main"
sudo apt install -y build-essential cmake git unzip zip\
                pkg-config libavcodec-dev libavformat-dev libswscale-dev \
                libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev \
                libsnappy-dev libboost-all-dev libjasper-dev libdc1394-22-dev\
                python3-dev python3-numpy python3-pip ffmpeg libopenblas-dev \
                tesseract-ocr libtesseract-dev libprotobuf-dev libleveldb-dev \
                libhdf5-serial-dev protobuf-compiler libatlas-base-dev \
                libgflags-dev libgoogle-glog-dev liblmdb-dev libfaac-dev \
                gfortran libgstreamer1.0-dev libatlas-base-dev libxvidcore-dev \
                libpng-dev libopenexr-dev libwebp-dev \
                libmp3lame-dev libtheora-dev libvorbis-dev  \
                libopencore-amrwb-dev x264 v4l-utils libgdk-pixbuf2.0-dev \
                manpages-dev libopencore-amrnb-dev \
                libgstreamer-plugins-base1.0-dev libavresample-dev 
pip3 install --upgrade pip
apt-get install -f
```

## Configure CMake project

Remenber to execute all the build commands within a temporary directory. This way, if you make a mistake, you can easily delete the entire temporary folder to quickly start over.

```bash
mkdir build && cd build
```

To display a list of all CMake compile options, run the following command:

```bash
cmake .. -LAH
```

- L List cached variables.
- A Show options [marked as advanced](https://cmake.org/cmake/help/v3.0/command/mark_as_advanced.html).
- H Show more helpful information about each option.

Here's an example configure command that you can use. If you've successfully installed the dependencies according to the previous instructions, this example cmake command should work for you.

```bash
cmake -D CMAKE_BUILD_TYPE=RELEASE \
        -D CMAKE_INSTALL_PREFIX=/usr/local/ \
        -D OPENCV_ENABLE_NONFREE=ON \
        -D OPENCV_EXTRA_MODULES_PATH=~/opencv_build/opencv_contrib-$vernum/modules \
        -D OPENCV_GENERATE_PKGCONFIG=YES \
        -D WITH_QT=OFF \
        -D WITH_OPENGL=OFF \
        -D WITH_CUDA=OFF \
        -D BUILD_EXAMPLES=ON \
        -D INSTALL_PYTHON_EXAMPLES=ON \
        -D INSTALL_C_EXAMPLES=ON ..
```

If you find it overwhelming to deal with extensive text in the command line and have a GUI installed on your machine, consider trying tools like **`ccmake`** and **cmake-gui** for a more user-friendly experience.

## Compile

We've completed the necessary steps, and now it's in the hands of your CPUs. The **-j** flag specifies how many threads will be used for compilation, and it should not exceed the number of CPU cores you have.

```bash
make -j6
```

If the compilation process proceeds without errors, you can proceed with the installation by simply running this single line of code:

```bash
make install
```

At this point, CMake should be able to detect the OpenCV library files.
