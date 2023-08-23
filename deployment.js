const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');

// Your Vercel API token
const VERCEL_API_TOKEN = 'fBezJGbFdlLnncLvOwile5jk';

async function deployToVercel() {
  try {
    // Build the project (You can replace this with your build script)
    console.log('Building the project...');
    execSync('npm run build', { stdio: 'inherit' });

    // Deploy to Vercel using the Vercel CLI
    console.log('Deploying to Vercel...');
    execSync(`vercel --prod`, { stdio: 'inherit' });

    // Read the project ID from .vercel/project.json
    const projectConfig = JSON.parse(fs.readFileSync('.vercel/project.json'));
    const projectID = projectConfig.projectId;

    // Get the latest deployment URL from Vercel API
    const response = await axios.get(`https://api.vercel.com/v6/deployments?projectId=${projectID}`, {
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
    });

    const deploymentUrl = response.data.deployments[0].url;
    console.log(deploymentUrl)
    const deploymentUrlHttp = `https://${deploymentUrl}`;
    console.log(deploymentUrlHttp)
    console.log(`Deployment URL: ${deploymentUrl}`);
    execSync(`start https://${deploymentUrl}`);
  } catch (error) {
    console.error('Error deploying to Vercel:', error);
  }
}

deployToVercel();
