# Semrush API Tutorial
In this tutorial we're going to setup a Node.js script found in [index.js](index.js) that will request your website's competitors from Semrush APIs found here: https://www.semrush.com/api-analytics/ and then write the results up into Google BigQuery.

While this is a "Hello World" type app, it is a useful first step to working with the Semrush APIs.

You will also start to see how this might be useful for executing a competitor analysis that might have several steps like:

1. Get competitors
2. Filter by competitor relevance, # of common keywords,  
3. Write to BQ
4. Create an array of competitors
5. Go get all their keywords
6. Find Gaps - compare all your keywords with their keywords
7. Segment the keywords by, search volume, cpc, seasonality
8. Make content strategy decisions
9. Build content
10. Promote content
11. 🛳🍸 Boatdrinks!

## Code Setup Directions

You can follow this video for guidance:

[![Semrush video turtorial](https://img.youtube.com/vi/yoYn0kLyXXw/0.jpg)](https://www.youtube.com/watch?v=yoYn0kLyXXw)

## Step 1 
Download & Install a FREE Software program called Visual Studio Code (VSCode) from https://code.visualstudio.com/download

## Step 2 
Set Up Local environment. 

Step 2A. Create a folder on your computer and name it 'semrush'.
    
Step 2B. Open this folder in VSCode with File > Open....

Setp 2C. Create an empty file named index.js inside the folder.

Step 2D. Paste the contents of [index.js](index.js) listed above inside the newly created file and hit "Save" inside VSCode.
    
## Step 3 
Open the Terminal inside VSCode. Hit Terminal > New Terminal

## Step 4 
Type `npm init` and hit enter or return inside the Terminal you just opened.  This will setup your Node environment. You'll be guided through a series of prompts, hit enter or return at each one.

## Step 5 
Type into terminal `npm install fs axios fs-ndjson googleapis @google-cloud/bigquery` and hit enter or return

## Step 6 
Check if Node.js is installed on your machine and install if necessary.
Type into VSCode terminal `node -v` and hit enter / return.  You should see a version like `v12.18.3` appear in the next line.

If there is no version, then you need to install Node.js on your machine.  To do so, go to https://nodejs.org/en/download/, download the installer, open it, and then run it. After you successfully install Node.js, head back to VSCode and type `node -v` into terminal again.  If you see the version now, you are ready to roll.

## Step 7
Create a Google Cloud Project. Directions are here: https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project
    
Step 7A. Navigate to the project's home screen (Hamburger menu > Home) inside Google Cloud Console.

Step 7B. Copy the value from the Project Info section.

Step 7C. Paste the value into theo ProjectId variable in the CONFIG SECTION.

## Step 8 
Create a Google BigQuery Dataset. Directions are here: https://cloud.google.com/bigquery/docs/datasets#create-dataset
    
Step 8A. Copy the name and paste it into the dataset variable in the CONFIG SECTION.

## Step 9 
Create a Google Service account. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-accounts

Step 9A. Give the Service Account 'BigQuery Admin' role. Directions are here: https://cloud.google.com/iam/docs/granting-changing-revoking-access

Step 9B. Create Service account JSON Keys files. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-account-keys

Step 9C. Download the file to your computer.

Step 9D. Rename the keys file to creds.json.

Step 9E. Move it into your newly created folder called 'semrush'.

## Step 10 
Edit the domain variable in the CONFIG SECTION below to point to the domain you'd like to get competitors for.

## Step 10 
Copy your Semrush API key from https://www.semrush.com/billing-admin/profile/subscription/api-units and paste it into the semrushapi variable in the CONFIG SECTION.

## Step 11 
Run the script! 
Type `node index.js` into VSCode terminal and hit enter or return.

## Step 12 
Celebrate!  

You've just grabbed data from the Semrush API and written it up into BigQuery.  

The world is officially now your 🦪 oyster!!!
