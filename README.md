Mediamorph - Unlimited Free Video & Audio Converter
    Mediamorph is a powerful and user-friendly web application that allows users to convert videos and audio files into various formats with ease. Built using modern web technologies like React and FFmpeg, Mediamorph supports a wide range of audio and video formats, providing fast and efficient conversion services.

![screenshot1.png](https://github.com/sateshcharan/Mediamorph/blob/main/screenshots/screenshot1.png)

Features
-   Unlimited Conversions: Convert an unlimited number of audio and video files for free.
-   Supports Multiple Formats: Convert to and from a variety of popular audio and video formats, including MP4, MP3, WAV, MKV, FLAC, AVI, and more.
-   Batch Processing: Convert multiple files at once with batch processing.
-   No File Size Limits: Handle large files seamlessly.
-   FFmpeg Integration: Uses FFmpeg for high-quality media conversion directly in the browser.
-   Customizable Output: Choose from different output formats for each file.
-   Simple & Intuitive UI: Easy-to-use interface designed for efficiency.

![screenshot2.png](https://github.com/sateshcharan/Mediamorph/blob/main/screenshots/screenshot2.png)

Demo
    Check out the live version of Mediamorph here: [sateshcharan-mediamorph.netlify.app](https://sateshcharan-mediamorph.netlify.app/)

Technologies Used
    Frontend:
    -   React (TypeScript)
    -   Shadcn for UI components
    -   Tailwind CSS for styling
    Media Processing:
    -   FFmpeg via @ffmpeg/ffmpeg for audio and video transcoding in the browser.
    Other Libraries:
    -   React Dropzone for file drag-and-drop functionality
    -   JSZip for compressing files into a zip archive for downloads.

Installation
    Prerequisites
    Node.js and npm installed on your machine.

Steps to Run Locally
    Clone the Repository:

```bash
git clone https://github.com/sateshcharan/Mediamorph.git
cd Mediamorph
```

Install Dependencies:
    Run the following command to install all the project dependencies:

```bash
npm install
```

Run the Application:
    After the dependencies have been installed, run the application:

```bash
npm run dev
```

Open in Browser:
    Once the app is running, open http://localhost:5173 in your browser to view the application.

How to Use
    Drag & Drop Files: Upload video or audio files by dragging and dropping them into the designated area or by selecting files from your device.
    Choose Output Format: Select the output format for each file (e.g., MP4 for video, MP3 for audio).
    Convert Files: Click the "Convert" button to start the transcoding process.
    Download Converted Files: Once conversion is complete, download each file or download all files as a zip archive.
Code Structure

```bash
/src
  ├── /components        # UI components (Button, Input, Dropzone, etc.)
  ├── /contexts          # FileContext for managing file state
  ├── /hooks             # Custom hooks (e.g., useErrorToast)
  ├── /types             # TypeScript types
  ├── /utils             # Utility functions (e.g., fetchFile)
  ├── App.tsx            # Main app component
  └── index.tsx          # Entry point
```

Contributing
    If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are always welcome!

Steps to Contribute:
-   Fork the project.
-   Create a new branch for your feature (git checkout -b feature-name).
-   Make your changes and commit them (git commit -m 'Add some feature').
-   Push to the branch (git push origin feature-name).
-   Open a Pull Request.

License
    This project is licensed under the MIT License - see the LICENSE file for details.

Contact
    If you have any questions or feedback, feel free to reach out to me via [sateshcharans@gmail.com](mailto:sateshcharans@gmail.com) or any of my other social handles