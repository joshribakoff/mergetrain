A github notifications bot and merge queue

Problem 1: On larger teams, everyone tries to merge their PRs and conflicts can arise, because of this its a good idea to make sure you merge the latest `main` branch into your branch and ensure CI passes before merging. However, this takes time and in the meantime someone may merge another PR. This creates a potentially vicious cycle where developers are wasting time trying to get  their branch green, competing against each other.

Solution 1: We can use a bot to listen for github comments on the PR. When the author comments indicating the intention to merge, the PR can be added to a queue the bot maintains. When it is time, the bot can update the branch, run the tests, attempt the merge and notify interested parties of the result. Multiple PRs can be batched together into a temporary branch to run the tests on the combined changes for even faster merge trains!

Problem 2: With github CODEOWNERS, notifications can still be quite noisy, you may get notifications for activity from other teams or PRs you are not interested in.

Solution 2: Allow slack channels (public channel, a DM with the bot, etc) to subscribe to github targets (teams or users). The bot will maintain a mapping of slack channel ID to github target. When a PR is opened and a team or user is requested to review, the bot will notify all subscribed channels. There should be a way to customize the types of notifications each subscription triggers, for example, subscribing to review requests, mentions, changes requested, comments, merged, failed to merge, etc.

## Backend


### Prerequisites:

You will need `ingress-nginx`:

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install my-release ingress-nginx/ingress-nginx
```

Your k8s cluster should have `metrics-server` since autoscaling is used:

```
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.4.1/components.yaml
```


### Dev locally (using minikube):

Install minikube https://minikube.sigs.k8s.io/docs/start/
Install skaffold https://skaffold.dev/docs/install/

```bash
skaffold dev --kube-context=minikube --port-forward
```

### Deploy to prod (or any cluster environment):

```
rm -fr backend/chart/charts
rm -fr bot/chart/charts

helm dependency update backend/chart
helm dependency update bot/chart

skaffold run --kube-context do-sfo2-ribs --default-repo jshpro2
```

You should see output like this:

```
Port forwarding service/mergetrain-chart in namespace default, remote port 80 -> address 127.0.0.1 port 4503
Port forwarding service/mergetrain-mongodb in namespace default, remote port 27017 -> address 127.0.0.1 port 27017
Press Ctrl+C to exit
[chart] Example app listening at http://localhost:3000
```

Access the app on port `4503` (not port `3000` which is internal to the pod)


## Website

The website uses nextJS:


```
cd website
yarn install
DATABASE_URL= GITHUB_ID= GITHUB_SECRET= yarn dev
```

For example, since Skaffold forwarded port 27017 to your host machine, open Robo 3T GUI and create the `mergetrain` database with user/password `mergetrain` with read/write access, and pass in `mongodb://mergetrain:mergetrain@127.0.0.1:27017/mergetrain?synchronize=true` as the `DATABASE_URL`