const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const packageName = core.getInput('package-name');
    const octokit = github.getOctokit(core.getInput('token'));
    const { data: metadata } = await octokit.request('GET /packages/container/{package_name}', {
      package_name: packageName
    });
    core.setOutput('package-metadata', JSON.stringify(metadata));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
