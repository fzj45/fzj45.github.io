
        var UserTrackBox = React.createClass({
          loadMusicFromServer: function() {
            var user = 'lincolnphu' ;
            var api = '6510c6b46fd1c71571bc40ee7037e1a9';
            var limitNumber = 50;
            var windowSize = window.innerWidth;

            if (windowSize => 1440){
              limitNumber = 95;
            }
            else if ( windowSize => 800 && windowSize < 1280) {
             limitNumber = 84;
            }
            else {
              limitNumber =50;
            }
            var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+api+'&format=json&limit='+limitNumber+''
              fetch(url)
                  .then(function(response) {
                      return response.json()

                  }).then(function(json) {
                      var data = json.recenttracks.track;
                      if (this.isMounted()) {
                          this.setState({
                              data: data,
                          });
                          this.forceUpdate.json;
                      }
                  }.bind(this)).catch(function(ex) {

                  })
        },
        getInitialState: function() {
            return {
                data: [],
            }
        },
        componentDidMount: function() {
          this.loadMusicFromServer();
          setInterval(this.loadMusicFromServer,60000);
        },

        shouldComponentUpdate: function(nextProps, nextState) {
            return true;
        },

        render: function() {
            return (
                <div className="LastFmlist">
                            <TrackList   data={this.state.data} />
                    </div>
            );
        }
    });

    var TrackList = React.createClass({
        render: function() {
            var trackNodes = this.props.data.map(function(result, index) {
                var _furl = result.image[1]["#text"];
                var _fartist = result.artist["#text"];
                var _fname = result.name;
                var _fhref = result.url;
                // var _fdate = result.date;



                if (_furl == 0) {
                    var newimg = 'http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg';
                    _furl = newimg;
                }

                return (<Track
                  fartist={_fartist}
                  fhref= {_fhref}
                   fname={_fname}
                    furl={_furl}
                     key={index}/>);

            });
            return (
                <ul className="userTrackBox">
                       {trackNodes}
                    </ul>
            );
        }
    });

    var Track = React.createClass({

        componentDidMount: function() {
            $(ReactDOM.findDOMNode(this.refs.tips)).tooltip({
        title: this.props.fartist +'<br />'+ this.props.fname,
        html: true,
    });
        },
        render: function() {
          var hide;
            hide = <img  className="list" src={this.props.furl}/>
            return (
                <a  ref="tips" href={this.props.fhref} data-toogle="tooltip" data-placement="left" >
                     {hide}
                 </a>


               );
         }
    });

    ReactDOM.render(
        <UserTrackBox />,
        document.getElementById('content')
    );
