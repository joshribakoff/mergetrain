const reviewRequested = require('./review-requested-team.json')
const githubWebhook = require('./github-webhook')

it('responds with hi world',()=>{
    const req = {body: reviewRequested}
    const res = {send: jest.fn()}
    githubWebhook(req, res)
    expect(res.send).toHaveBeenCalledWith('hi world')
})