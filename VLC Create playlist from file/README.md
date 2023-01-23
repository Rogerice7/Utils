# VLC Create playlist from file

These scripts make VLC behave like MPC-HC, ie when you open a file with VLC in a folder,
it will automatically add all the files in this folder to the playlist (starting with the opened file, then sorted alphabetically),
so that you can use Previous and Next to navigate through the folder.

## Usage

### Windows

Copy vlc.ps1 to your VLC folder next to vlc.exe. Run vlc.reg to add "VLC Playlist" option to context menu in windows explorer:

![image](https://user-images.githubusercontent.com/117949307/213956991-249a26e6-310f-4506-aff4-c33c0fdd667d.png)

You can check if the variable ```$vlcPath``` is correct in vlc.ps1, and modify known extensions with the variable ```$Extensions```. You can update vlc.ps1 path or add more file extentions to have context menu by changing vlc.reg.

## Notes

Due to internal behaviour of VLC, you cannot replace current playlist by another, only append it. Therefore the script must kill existing instances of VLC to launch a new playlist, so it works only when VLC is in one-instance mode. 

