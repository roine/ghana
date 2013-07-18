describe "Collection", ->
  describe "adjectives", ->
    Adjectives = new Meteor.Collection "adjectives"
    Meteor.subscribe 'adjectives'
    adj = Adjectives.findOne()

    it "has an array of adjectives with 929 entries", ->
      chai.expect(adj.text).to.be.an('array').with.length(929)
    # add done parameter for async testing
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

