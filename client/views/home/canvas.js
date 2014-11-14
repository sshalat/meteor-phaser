Template.canvas.rendered = function() {
	// WARNING : for now it is assumed the users and userpos length is the same
	var users = Meteor.users.find({});
	var userpos = PlayerPos.find({});

	userpos.observeChanges({
		changed: function(posId, changes) {
			console.log('NEW SAVE FOUND!');
			var player = CVS.MAIN.getPlayerByPosId(posId);

			if (changes.x === undefined) changes.x = player.sprite.x;
			if (changes.y === undefined) changes.y = player.sprite.y;

			player.findPathTo(changes, function() {
				player.paths[0]._tween.start();
			});
		}
	})

	CVS.MAIN.init({
		players: users.fetch(),
		playerpos: userpos.fetch()
	});
}