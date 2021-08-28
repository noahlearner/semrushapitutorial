# Semrush API Tutorial
In this tutorial we're going to setup a NODE.js script found in this Gist: https://gist.github.com/noahlearner/fd93496858f0953b150e01d829b57f31 that will request your website's competitors from Semrush APIs found here: https://www.semrush.com/api-analytics/ and then write the results up into Google BigQuery.

While this is a "Hello World" type execution, it is a useful first step to working with the Semrush APIs.

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

## Step 1 
Download & Install a FREE Software program called Visual Studio Code (VSCode) from https://code.visualstudio.com/download
## Step 2 
Set Up Local environment. 

    Step 2A. Create a folder on your computer and name it 'semrush'.
    
    Step 2B. Open this folder in VSCode with File > Open....
    
    Setp 2C. Add create an empty file named index.js inside the folder.
    
    Step 2D. Paste the contents of the Gist listed above inside the newly created file and hit "Save" inside VSCode.
    
## Step 3 
Open the Terminal inside VSCode. Hit Terminal > New Terminal
## Step 4 
Type `npm init` and hit enter or return inside the Terminal you just opened.  This will setup your Node environment. You'll be guided through a series of prompts, hit enter or return at each one.
## Step 5 
Type into terminal `npm install fs axios fs-ndjson googleapis @google-cloud/bigquery` and hit enter or return
## Step 6 
Create a Google Cloud Project. Directions are here: https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project
    
    Step 6A. Navigate to the project's home screen (Hamburger menu > Home) inside Google Cloud Console.
    
    Step 6B. Copy the value from the Project Info section.
    
    Step 6C. Paste the value into theo ProjectId variable in the CONFIG SECTION.
## Step 7 
Create a Google BigQuery Dataset. Directions are here: https://cloud.google.com/bigquery/docs/datasets#create-dataset
    
    Step 7A. Copy the name and paste it into the dataset variable in the CONFIG SECTION.
## Step 8 
Create a Google Service account. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-accounts
    
    Step 8A. Give the Service Account 'BigQuery Admin' role. Directions are here: https://cloud.google.com/iam/docs/granting-changing-revoking-access
    
    Step 8B. Create Service account JSON Keys files. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-account-keys
    
    Step 8C. Download the file to your computer.
   
    Step 8D. Rename the keys file to creds.json.
    
    Step 8E. Move it into your newly created folder called 'semrush'.
## Step 9 
Edit the domain variable in the CONFIG SECTION below to point to the domain you'd like to get competitors for.
## Step 10 
Copy your Semrush API key from https://www.semrush.com/billing-admin/profile/subscription/api-units and paste it into the semrushapi variable in the CONFIG SECTION.
## Step 11 
Run the script! 

    Type node index.js into VSCode terminal and hit enter or return.
## Step 12 
Celebrate!  

You've just grabbed data from the Semrush API and written it up into BigQuery.  

The world is officially now your 🦪 oyster!!!
