var cx = React.addons.classSet;

var Album = React.createClass({
	getInitialState: function(){
		return({
			artists: [],
			tracks: [],
			showingTracks: false

		})
	},
	componentDidMount: function(){
		$.get(this.props.link, this.handleAlbum);
	},
	handleAlbum: function(response){
		this.setState({
			artists: response.artists[0],
			tracks: response.tracks.items
		})
	},
	renderTracks: function(){
		if (this.state.showingTracks === false){
			this.setState({showingTracks: true})
		}else{
			this.setState({showingTracks: false})
		}
	},
	 handleShowModal: function() {
      this.refs.modal.show()
 	 },
 
	 handleExternalHide: function() {
	    this.refs.modal.hide()
	  },
	 
	handleDoingNothing: function() {
	    this.handleLog("Remember I said I'd do nothing? ...I lied!", 'danger')
	  },

	render: function(){
	 var buttons = [
        {type: 'danger',  text: 'Hide Modal',  handler: this.handleExternalHide}
      , {type: 'primary', text: 'Next Album', handler: this.handleDoingNothing}
      ]
	  var classes = cx({
	    'text-center': true,
	    'row': true,
	    'tracks': true		
	  });

		var album = this.props.data;
		var modalHeader = "" + album.name + " by " + this.state.artists.name
		return(
			<div className="albumContainer">
				<div className="col-sm-4 text-center singleAlbum">
					<div className="row artistName"><h4>{this.state.artists.name}</h4></div>
					<div className="row albumName">{album.name}</div>
					<div className="row">{album.release}</div>
					<div className="row"><img className="artistimage" src={album.images[0].url} /></div>
					<button className="btn btn-primary showtracks" onClick={this.handleShowModal}>Show da tracks</button>
				</div><br />
				<ExampleModal ref="modal"
			        show={false}
			        header={modalHeader}
			        buttons={buttons}>
				       <TrackList tracks={this.state.tracks} showing={true}/>
      			</ExampleModal>
			</div>
			)
	}
});

