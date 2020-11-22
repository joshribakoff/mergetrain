A github notifications bot and merge queue

Problem 1: On larger teams, everyone tries to merge their PRs and conflicts can arise, because of this its a good idea to make sure you merge the latest `main` branch into your branch and ensure CI passes before merging. However, this takes time and in the meantime someone may merge another PR. This creates a potentially vicious cycle where developers are wasting time trying to get  their branch green, competing against each other.

Solution 1: We can use a bot to listen for github comments on the PR. When the author comments indicating the intention to merge, the PR can be added to a queue the bot maintains. When it is time, the bot can update the branch, run the tests, attempt the merge and notify interested parties of the result. Multiple PRs can be batched together into a temporary branch to run the tests on the combined changes for even faster merge trains!

Problem 2: With github CODEOWNERS, notifications can still be quite noisy, you may get notifications for activity from other teams or PRs you are not interested in.

Solution 2: Allow slack channels (public channel, a DM with the bot, etc) to subscribe to github targets (teams or users). The bot will maintain a mapping of slack channel ID to github target. When a PR is opened and a team or user is requested to review, the bot will notify all subscribed channels. There should be a way to customize the types of notifications each subscription triggers, for example, subscribing to review requests, mentions, changes requested, comments, merged, failed to merge, etc.

## Development & Deployment


Install skaffold https://skaffold.dev/docs/install/

Dev locally (using minikube):

```bash
skaffold dev --kube-context=minikube --port-forward
```

Deploy to prod:

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install my-release ingress-nginx/ingress-nginx
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.4.1/components.yaml
rm -fr backend-chart/charts
helm dependency update backend-chart
skaffold run --kube-context do-sfo2-ribs --default-repo jshpro2
```

You should see output like this:

```
 skaffold dev --kube-context=minikube --port-forward
Listing files to watch...
 - mergetrain
Generating tags...
 - mergetrain -> mergetrain:644ad1b
Checking cache...
 - mergetrain: Found Locally
Tags used in deployment:
 - mergetrain -> mergetrain:ca6fd1f3c940952d876c530c52f7bef6b77a6c4ab25122ee8b256b41b6dad97a
Starting deploy...
Helm release mergetrain not installed. Installing...
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "haproxy-ingress" chart repository
...Successfully got an update from the "ingress-nginx" chart repository
...Successfully got an update from the "nginx-stable" chart repository
...Successfully got an update from the "traefik" chart repository
...Successfully got an update from the "jetstack" chart repository
...Successfully got an update from the "bitnami" chart repository
...Successfully got an update from the "stable" chart repository
Update Complete. ⎈Happy Helming!⎈
Saving 1 charts
Downloading mongodb from repo https://charts.bitnami.com/bitnami
Deleting outdated charts
NAME: mergetrain
LAST DEPLOYED: Sat Nov 21 17:46:26 2020
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
     NOTE: It may take a few minutes for the LoadBalancer IP to be available.
           You can watch the status of by running 'kubectl get --namespace default svc -w mergetrain-chart'
  export SERVICE_IP=$(kubectl get svc --namespace default mergetrain-chart --template "{{ range (index .status.loadBalancer.ingress 0) }}{{.}}{{ end }}")
  echo http://$SERVICE_IP:80
WARN[0010] error adding label to runtime object: patching resource default/"mergetrain-chart-test-connection": pods "mergetrain-chart-test-connection" not found 
Waiting for deployments to stabilize...
 - deployment/mergetrain-chart: waiting for rollout to finish: 0 of 1 updated replicas are available...
 - deployment/mergetrain-mongodb: waiting for rollout to finish: 0 of 1 updated replicas are available...
 - deployment/mergetrain-mongodb is ready. [1/2 deployment(s) still pending]
 - deployment/mergetrain-chart is ready.
Deployments stabilized in 12.491990766s
Port forwarding service/mergetrain-chart in namespace default, remote port 80 -> address 127.0.0.1 port 4503
Port forwarding service/mergetrain-mongodb in namespace default, remote port 27017 -> address 127.0.0.1 port 27017
Press Ctrl+C to exit
[chart] Example app listening at http://localhost:3000
```

Access the app on port `4503` (your port will differ) not port `3000` which is internal to the pod.