# Code Setup Directions
## Step 1. 
Download & Install a FREE Software program called Visual Studio Code (VSCode) from https://code.visualstudio.com/download
## Step 2. 
Set Up Local environment. 
    Step 2A. Create a folder on your computer and name it 'semrush'.
    
    Step 2B. Open this folder in VSCode with File > Open....
    
    Setp 2C. Add create an empty file named index.js inside the folder.
    
    Step 2D. Paste the contents of this Gist inside the newly created file and hit "Save" inside VSCode.
    
## Step 3. 
Open the Terminal inside VSCode. Hit Terminal > New Terminal
## Step 4. 
Type 'npm init' and hit enter or return inside the Terminal you just opened.  This will setup your Node environment. You'll be guided through a series of prompts, hit enter or return at each one.
## Step 5. 
Type into terminal "npm install fs axios fs-ndjson googleapis @google-cloud/bigquery"  (no quotes) and hit enter or return
## Step 6. 
Create a Google Cloud Project. Directions are here: https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project
    
    Step 6A. Navigate to the project's home screen (Hamburger menu > Home) inside Google Cloud Console.
    
    Step 6B. Copy the value from the Project Info section.
    
    Step 6C. Paste the value into theo ProjectId variable in the CONFIG SECTION below.
## Step 7. 
Create a Google BigQuery Dataset. Directions are here: https://cloud.google.com/bigquery/docs/datasets#create-dataset
    
    Step 7A. Copy the name and paste it into the dataset variable in the CONFIG SECTION below.
## Step 8. 
Create a Google Service account. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-accounts
    
    Step 8A. Give the Service Account 'BigQuery Admin' role. Directions are here: https://cloud.google.com/iam/docs/granting-changing-revoking-access
    
    Step 8B. Create Service account JSON Keys files. Directions on how to do that are here: https://cloud.google.com/iam/docs/creating-managing-service-account-keys
    
    Step 8C. Download the file to your computer.
   
    Step 8D. Rename the keys file to creds.json.
    
    Step 8E. Move it into your newly created folder called 'semrush'.
## Step 9. 
Edit the domain variable in the CONFIG SECTION below to point to the domain you'd like to get competitors for.
## Step 10. 
Copy your semrush API key from https://www.semrush.com/billing-admin/profile/subscription/api-units and paste it into the semrushapi variable in the CONFIG SECTION below.
## Step 10. Run the script! Type node index.js into VSCode terminal and hit enter or return.
## Step 11. 
Celebrate!  You've just grabbed data from the Semrush API and written it up into BigQuery.  
The world is officially now your oyster!!!
