workflow "Install dependencies, build and deploy" {
  on = "push"
  resolves = ["install"]
}

action "install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  runs = "install"
}
