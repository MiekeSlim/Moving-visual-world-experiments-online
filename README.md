# How to use this repository?

Experiment scripts accompanying the paper *Moving visual world experiments online? A web-based replication of Dijkgraaf, Hartsuiker, and Duyck (2017) using PCIbex and WebGazer.js* by Mieke Sarah Slim and Robert J. Hartsuiker.

## Using PCIbex
The experiments are programmed and implemented in *PennController for IBEX* (*PCIbex*, Zehr & Schwarz, 2018) and uses the *[WebGazer.js](https://webgazer.cs.brown.edu/)* algorithm to track the participants' eye-movements using the webcam. Some knowledge of how PCIbex works is required to understand these scripts. If you want to use this script, it is highly recommended to first study the PCIbex documentation ([https://doc.pcibex.net/](https://doc.pcibex.net/)), go through both the [basic](https://doc.pcibex.net/basic-tutorial/) and [advanced](https://doc.pcibex.net/advanced-tutorial/) tutorials, and study the [how-to guide on collecting eye tracking data](https://doc.pcibex.net/how-to-guides/collecting-eyetracking-data/) written by the PCIbex developers. In fact, much of the code in the experiment scripts in this repository are adapted from the example eye-tracking script described in PCIbex' to-do guide.

## Importing the files into the PCIbex Farm
These scripts can be run in the freely available [PCIbex Farm](https://farm.pcibex.net/). It is easy to sync this GitHub repostitory onto the PCIbex Farm:

1. Go to https://farm.pcibex.net/ and create a free account (optional, but needed to save the experiment).
2. Create a new project.
3. In the panel on the right, select 'Git Sync'.
4. Paste the following URL into the Git URL: https://github.com/MiekeSlim/Moving-visual-world-experiments-online.git.
5. Select the branch you wish to import (Experiment 1 or Experiment 2).
6. Accept to replacing existing files.
7. And you're all set! Sometimes, it's needed to refresh the page to make the new main.js files appear. 

(These instructions are also written in the [how-to on the PCIbex website](https://doc.pcibex.net/how-to-guides/github/)). 

**Note that there are two branches** in this repository: One for the fixation task (Experiment 1 in the paper) and one for the web-based replication of Dijkgraaf, Hartsuiker, and Duyck's experiment (Experiment 2 in the paper). To sync these brances, copy this link: [https://github.com/MiekeSlim/Moving-visual-world-experiments-online.git](https://github.com/MiekeSlim/Moving-visual-world-experiments-online.git) into the PCIbex Farm, and select the branch of the experiment you wish to sync. 

You can also explore the files within the different branches by selecting a different branch in the drop-down menu above (which now says 'main'). This way, you can also download the code folders from GitHub.

## Further info
The scripts in this repository are most recently tested in PCIbex 2.0. The calibration procedure in newer versions of PCibex is slightly different than described in the paper, but the underlying logic of the calibration is similar. I cannot garantuee that I will maintain the script up-to-date to be used in the later versions of PCIbex. Nevertheless, if you have any questions or spot any bugs, please get in touch via <mieke.slim@ugent.be>, and I will do my best to troubleshoot. 
