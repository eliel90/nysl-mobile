Vue.config.devtools = true;

var monthmatches = Vue.component('monthmatches', {
  props: ['months'],
  template: `
    <div>
      <h3>{{months.month}}</h3>
      <table id="matchesList"  class="table table-borderless table-condensed table-hover">
        <thead>
            <tr>
              <th>Date</th>
              <th>Morning</th>
              <th>Afternoon</th>
            </tr>
        </thead>
        <tbody id="tbodyMatches">
            <tr v-for="match in filteredMatches">
              <td scope="row">{{match.date}}</td>
              <td v-if="(match.matches[0].team1 == $parent.teamChosen || match.matches[0].team2 == $parent.teamChosen) || $parent.teamChosen == 'ALL' "><a v-on:click="$emit('matchChosen', match.matches[0].idMatch)">{{match.matches[0].team1 + " vs " + match.matches[0].team2}}</a></td>
              <td v-else> </td>
              <td v-if="(match.matches[1] != undefined) ? ((match.matches[1].team1 == $parent.teamChosen || match.matches[1].team2 == $parent.teamChosen)  || $parent.teamChosen == 'ALL' ): 0" v-on:click="$emit('matchChosen', match.matches[1].idMatch)">{{(match.matches[1].team1 + " vs " + match.matches[1].team2)}}</td>
              <td v-else> </td>
            </tr>
        </tbody>
      </table>
    </div>
  `,
  computed: {
    filteredMatches: function() {
      return this.months.dates.filter(u => (this.$parent.teamChosen == 'ALL' || ((u.matches[0].team1 == this.$parent.teamChosen || u.matches[0].team2 == this.$parent.teamChosen) || ((u.matches[1] == undefined) ? 0 : ( u.matches[1].team1 == this.$parent.teamChosen || u.matches[1].team2 == this.$parent.teamChosen ))) ));   
    }
  },
});

var gameinfo = Vue.component('gameinfo', {
  props: ['match'],
  template: `
    <div>
      <h2 id="homeTitle">Game Information</h2>
      <div class="row"><div class="col-12"><h3>  </h3></div></div>
      <h3>MATCH: {{match.team1}} vs {{match.team2}}:</h3>
      <div class="row">
        <div class="col-12"><h4>DATE - {{match.time}}</h4></div>
      </div>
      <div class="row">
        <div class="col-12"><h4>{{match.location}}</h4></div>
      </div>
      <div class="row">
        <div class="col-12">Mapa</div>
      </div>
    
    </div>
  `
});

var app=new Vue({
  el:'#app',
  data: {
    teamChosen: 'ALL',
    matchesData : info.schedule,
    monthSelected : "",
    idMatchSelected : 0,
    showMain: true,
    showMatch: true,
  },
  computed: {
    matchInfoSelected: function(){
      this.matchesData.forEach(element => {
//        if(element.month == this.monthSelected){
          element.dates.forEach(date => {
            date.matches.forEach(match => {
              if(match.idMatch == this.idMatchSelected){
                console.log(match);
                return match;
              }
            });
          });
//        }
      });
    }
  },
  components: {
    monthmatches,
    gameinfo
  },
  methods: {

  }
}); 

