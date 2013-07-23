describe "Collection", ->
  describe "adjectives", ->
    Adjectives = new Meteor.Collection "adjectives"
    Meteor.subscribe 'adjectives'
    adj = Adjectives.findOne()

    it "has an array of adjectives with 929 entries", ->
      chai.expect(adj.text).to.be.an('array').with.length(929)

    it "cannot be edited", (done) ->
      # push a value
      Adjectives.update adj._id, $push: text: 'bob', (e) ->
        done() if e? and e.error is 403

      # pop the last value
      Adjectives.update adj._id, $pop: text:1

    it "cannot insert data", (done) ->
      insertId = Adjectives.insert test: 1, (e) ->
        done() if e? and e.error is 403

      # remove the inserted value
      Adjectives.remove _id:insertId

    it "cannot remove data", (done) ->
      # need to do something here to cache the data before testing remove
      Adjectives.remove adj._id, (e) ->
        done() if e? and e.error is 403

describe "shared lib", ->
  # insert two users, one admin one normal user
  before (done) ->
        window.admin = Meteor.users.insert
          username:'admin',
          email: 'admin@admin.com',
          password: '123456',
          isAdmin: true
          ->
            window.user = Meteor.users.insert
              username:'user',
              email:'user@user.com',
              password:'123456',
              (e) ->
                done(e)
  # remove the two users
  after (done) ->
    Meteor.users.remove admin, ->
      Meteor.users.remove user, (e) ->
        done(e)

  describe "check if the user is admin", ->
    it "should return nothing", ->
      chai.expect(isAdmin()).to.be.false
    it "should return true for admin", ->
      chai.expect(isAdmin(admin)).to.be.true
    it "should return false if id doesnt exists", ->
      chai.expect(isAdmin("notAdmin")).to.be.false
    it "should return false if the user is not an Admin user", ->
      chai.expect(isAdmin(user)).to.be.false

