var UserTrackBox = React.createClass({
          loadMusicFromServer: function() {
            var user = 'lincolnphu' ;
            var api = '6510c6b46fd1c71571bc40ee7037e1a9';
            var limitNumber = 50;
            var windowSize = window.screen.availWidth;

            if (windowSize > 1465){
              limitNumber = 98;
            }
            else if (windowSize == 1440){
              limitNumber= 84;
            }
            else if ( windowSize > 800 && windowSize < 1280) {
             limitNumber = 64;
            }
            else {
              limitNumber =50;
            }
            var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+api+'&format=json&limit='+limitNumber+'';
              fetch(url)
                  .then(function(response) {
                      return response.json();
                  }).then(function(json) {
                      var data = json.recenttracks.track;
                      if (this.isMounted()) {
                          this.setState({
                              data: data,
                          });
                          this.forceUpdate();
                      }
                  }.bind(this)).catch(function(err) {
                    console.log('parsing failed', err);
                  });
        },
        getInitialState: function() {
            return {
                data: [],
            };
        },
        componentDidMount: function() {
          this.loadMusicFromServer();
          setInterval(this.loadMusicFromServer,60000);
        },

        shouldComponentUpdate: function() {
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
                var imga = true;
                // var _furl = imga ? "http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg" :  furl = result.image[1]["#text"];
                var Obj  = {
                furl:imga ? "http://img2-ak.lst.fm/i/u/174s/e04ce91798e34c36b21a85a9fab01b40.jpg":result.image[1]["#text"],
                fartist : result.artist["#text"],
                fname : result.name,
                fhref : result.url,
                key:index
              };


                return (<Track
                  {...Obj}/>);

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
           var like = document.getElementsByClassName("xh");
           for (var index = 0; index < like.length; ++index) {
            
             like[0].style.display="none";
};
            $(ReactDOM.findDOMNode(this.refs.tips)).tooltip({
        title: this.props.fartist +'<br />'+ this.props.fname,
        html: true,
    });
        },
        render: function() {
            return (
                <a  ref="tips" className="xh" href={this.props.fhref} data-toogle="tooltip" data-placement="left" >
                     <img  className="list" src={this.props.furl}/>
                 </a>


               );
         }
    });



    ReactDOM.render(
      <div>
      <UserTrackBox />
        </div>,
        document.getElementById('content')
    );