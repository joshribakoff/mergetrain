A github notifications bot and merge queue

Problem 1: On larger teams, everyone tries to merge their PRs and conflicts can arise, because of this its a good idea to make sure you merge the latest `main` branch into your branch and ensure CI passes before merging. However, this takes time and in the meantime someone may merge another PR. This creates a potentially vicious cycle where developers are wasting time trying to get  their branch green, competing against each other.

Solution 1: We can use a bot to listen for github comments on the PR. When the author comments indicating the intention to merge, the PR can be added to a queue the bot maintains. When it is time, the bot can update the branch, run the tests, attempt the merge and notify interested parties of the result. Multiple PRs can be batched together into a temporary branch to run the tests on the combined changes for even faster merge trains!

Problem 2: With github CODEOWNERS, notifications can still be quite noisy, you may get notifications for activity from other teams or PRs you are not interested in.

Solution 2: Allow slack channels (public channel, a DM with the bot, etc) to subscribe to github targets (teams or users). The bot will maintain a mapping of slack channel ID to github target. When a PR is opened and a team or user is requested to review, the bot will notify all subscribed channels. There should be a way to customize the types of notifications each subscription triggers, for example, subscribing to review requests, mentions, changes requested, comments, merged, failed to merge, etc.

## Development & Deployment

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.4.1/components.yaml

rm -fr backend-chart/charts
helm dependency update backend-chart      

Install skaffold https://skaffold.dev/docs/install/

➜ skaffold dev --port-forward