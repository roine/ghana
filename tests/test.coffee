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
    try
      adminId = Meteor.users.findOne({username:'admin'})._id
      Meteor.users.remove(adminId)
      userId = Meteor.users.findOne({username:'user'})._id
      Meteor.users.remove(userId)
    catch e

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
    Meteor.users.remove window.admin, ->
      Meteor.users.remove window.user, (e) ->
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

describe "Take methods", ->
  arr = { values: [ { test:{ name:1 } }, { test:{ name:2, bob:{ name:3 } } } ], test: { name:5 } }
  it "be on theglobal scope", ->
    chai.expect(take).to.exist

  it "should return an array with all the requested data", ->
    filteredArr = take.each('test.name').from(arr.values)
    chai.expect(filteredArr).to.be.an('array').with.length(2)

  it "should return a number", ->
    val = take.a('test.name').from(arr)
    chai.expect(val).to.be.a('number').and.equal(5)

  it "should chain in any order", (done) ->
    filteredArr = take.from(arr.values).each('test.name')
    val = take.from(arr).a('test.name')
    chai.expect(filteredArr).to.be.an('array').with.length(2)
    chai.expect(val).to.be.a('number').and.equal(5)
    # make sure the two test above are passed
    done()






