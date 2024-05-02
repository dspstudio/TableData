<script setup>
import { onMounted, ref } from 'vue';
import TableData from './components/Table/Data.vue';
import TdEmail from './components/Email.vue';
import DeleteButton from './components/DeleteButton.vue';

const data = ref(null);
const header = [
  {
    name: 'id',
    label: 'ID',
    sortable: false,
    searchable: false,
    class: {
      th: 'p-4 w-20 text-center',
      td: 'text-center'
    }
  },
  {
    name: 'email',
    label: 'Email address',
    sortable: true,
    searchable: true,
    component: TdEmail,
    class: {
    }
  },
  {
    name: 'first_name',
    label: 'First Name',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'last_name',
    label: 'Last Name',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'gender',
    label: 'Gender',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'ip_address',
    label: 'IP',
    sortable: true,
    searchable: true,
    class: {
      th: 'text-center cursor-pointer'
    }
  },
  {
    name: 'delete',
    label: 'Delete',
    sortable: false,
    searchable: false,
    component: DeleteButton,
    class: {
      th: 'w-20 text-center',
      td: 'cursor-pointer'
    }
  },
];
onMounted(() => {
  setTimeout(() => {
    data.value = [{"id":1,"first_name":"Benn","last_name":"Crathorne","email":"bcrathorne0@forbes.com","gender":"Male","ip_address":"151.30.172.221"},
    {"id":2,"first_name":"Querida","last_name":"Dionisetto","email":"qdionisetto1@wordpress.org","gender":"Female","ip_address":"237.89.84.65"},
    {"id":3,"first_name":"Rubin","last_name":"Aronovich","email":"raronovich2@spiegel.de","gender":"Male","ip_address":"29.121.225.33"},
    {"id":null,"first_name":null,"last_name":null,"email":null,"gender":null,"ip_address":"74.49.152.128"},
    {"id":5,"first_name":"Ulrikaumeko","last_name":"Sherwen","email":"usherwen4@independent.co.uk","gender":"Bigender","ip_address":"200.225.223.178"},
    {"id":6,"first_name":"Harcourt","last_name":"Endricci","email":"hendricci5@odnoklassniki.ru","gender":"Male","ip_address":"145.54.238.150"},
    {"id":7,"first_name":"Sam","last_name":"Glendenning","email":"sglendenning6@statcounter.com","gender":"Female","ip_address":"6.49.160.116"},
    {"id":8,"first_name":"Tracy","last_name":"Jillis","email":"tjillis7@wiley.com","gender":"Genderqueer","ip_address":"163.193.156.113"},
    {"id":9,"first_name":"Gerri","last_name":"Bullus","email":"gbullus8@hubpages.com","gender":"Male","ip_address":"161.121.255.182"},
    {"id":10,"first_name":"Danell","last_name":"Goodreid","email":"dgoodreid9@deviantart.com","gender":"Female","ip_address":"234.125.230.140"},
    {"id":11,"first_name":"Stanislas","last_name":"Vittore","email":"svittorea@delicious.com","gender":"Male","ip_address":"72.95.65.56"},
    {"id":12,"first_name":"Nadia","last_name":"Horwell","email":"nhorwellb@hubpages.com","gender":"Female","ip_address":"247.168.10.41"},
    {"id":13,"first_name":"Guglielmo","last_name":"Hansana","email":"ghansanac@imdb.com","gender":"Male","ip_address":"187.213.34.155"},
    {"id":14,"first_name":"Sheena","last_name":"Wykey","email":"swykeyd@slideshare.net","gender":"Female","ip_address":"103.198.198.168"},
    {"id":15,"first_name":"Brinn","last_name":"Conahy","email":"bconahye@istockphoto.com","gender":"Female","ip_address":"48.168.104.117"},
    {"id":16,"first_name":"Merrill","last_name":"Wildin","email":"mwildinf@typepad.com","gender":"Male","ip_address":"5.34.141.14"},
    {"id":17,"first_name":"Daisey","last_name":"Costanza","email":"dcostanzag@t.co","gender":"Female","ip_address":"127.19.66.221"},
    {"id":18,"first_name":"Andrea","last_name":"Sitch","email":"asitchh@utexas.edu","gender":"Male","ip_address":"178.184.227.146"},
    {"id":19,"first_name":"Cordelia","last_name":"Screase","email":"cscreasei@hhs.gov","gender":"Female","ip_address":"127.217.33.20"},
    {"id":20,"first_name":"Sashenka","last_name":"Halesworth","email":"shalesworthj@reference.com","gender":"Female","ip_address":"53.27.71.103"},
    {"id":21,"first_name":"Zak","last_name":"Archibold","email":"zarchiboldk@accuweather.com","gender":"Male","ip_address":"202.130.40.24"},
    {"id":22,"first_name":"Maxim","last_name":"Knightley","email":"mknightleyl@eepurl.com","gender":"Male","ip_address":"187.119.11.196"},
    {"id":23,"first_name":"Fey","last_name":"Beards","email":"fbeardsm@t.co","gender":"Female","ip_address":"44.159.217.239"},
    {"id":24,"first_name":"Marcile","last_name":"Lafflina","email":"mlafflinan@biblegateway.com","gender":"Bigender","ip_address":"8.130.253.25"},
    {"id":25,"first_name":"Filbert","last_name":"Benck","email":"fbencko@mashable.com","gender":"Male","ip_address":"0.216.196.93"},
    {"id":26,"first_name":"Joell","last_name":"Roper","email":"jroperp@census.gov","gender":"Female","ip_address":"222.120.104.157"},
    {"id":27,"first_name":"Letti","last_name":"Sellar","email":"lsellarq@geocities.jp","gender":"Female","ip_address":"180.228.195.130"},
    {"id":28,"first_name":"Kellia","last_name":"Sinnocke","email":"ksinnocker@zimbio.com","gender":"Female","ip_address":"60.228.168.232"},
    {"id":29,"first_name":"Georgeanna","last_name":"Polly","email":"gpollys@google.ru","gender":"Female","ip_address":"191.45.202.160"},
    {"id":30,"first_name":"Sarette","last_name":"Bengough","email":"sbengought@w3.org","gender":"Female","ip_address":"220.90.197.236"},
    {"id":31,"first_name":"Ford","last_name":"Wolver","email":"fwolveru@last.fm","gender":"Male","ip_address":"100.54.61.138"},
    {"id":32,"first_name":"Wynnie","last_name":"Madgewick","email":"wmadgewickv@homestead.com","gender":"Agender","ip_address":"138.184.185.170"},
    {"id":33,"first_name":"Fionnula","last_name":"Laughren","email":"flaughrenw@shop-pro.jp","gender":"Female","ip_address":"112.90.7.107"},
    {"id":34,"first_name":"Torre","last_name":"Petren","email":"tpetrenx@tmall.com","gender":"Male","ip_address":"70.150.43.219"},
    {"id":35,"first_name":"Jesus","last_name":"Fridaye","email":"jfridayey@de.vu","gender":"Male","ip_address":"223.102.7.47"},
    {"id":36,"first_name":"Archaimbaud","last_name":"Berceros","email":"abercerosz@bizjournals.com","gender":"Polygender","ip_address":"102.30.43.232"},
    {"id":37,"first_name":"Pammy","last_name":"Ziehm","email":"pziehm10@businesswire.com","gender":"Female","ip_address":"54.239.93.30"},
    {"id":38,"first_name":"Benita","last_name":"Dyball","email":"bdyball11@icio.us","gender":"Female","ip_address":"30.230.244.113"},
    {"id":39,"first_name":"Gennie","last_name":"Freak","email":"gfreak12@reverbnation.com","gender":"Agender","ip_address":"243.34.25.148"},
    {"id":40,"first_name":"Griffy","last_name":"Jordan","email":"gjordan13@nsw.gov.au","gender":"Male","ip_address":"7.179.92.87"},
    {"id":41,"first_name":"Katy","last_name":"Moggan","email":"kmoggan14@trellian.com","gender":"Female","ip_address":"159.237.224.64"},
    {"id":42,"first_name":"Raphael","last_name":"Farland","email":"rfarland15@free.fr","gender":"Male","ip_address":"85.220.91.245"},
    {"id":43,"first_name":"Chandler","last_name":"Aiskovitch","email":"caiskovitch16@cnn.com","gender":"Male","ip_address":"250.80.228.121"},
    {"id":44,"first_name":"Fergus","last_name":"Cheshir","email":"fcheshir17@fda.gov","gender":"Male","ip_address":"12.213.235.227"},
    {"id":45,"first_name":"Patrice","last_name":"Godbert","email":"pgodbert18@infoseek.co.jp","gender":"Male","ip_address":"150.156.37.77"},
    {"id":46,"first_name":"Ian","last_name":"Foster","email":"ifoster19@webeden.co.uk","gender":"Male","ip_address":"108.25.151.175"},
    {"id":47,"first_name":"Gabriel","last_name":"Bastie","email":"gbastie1a@sphinn.com","gender":"Female","ip_address":"130.221.96.68"},
    {"id":48,"first_name":"Lynnell","last_name":"Amsberger","email":"lamsberger1b@cbc.ca","gender":"Female","ip_address":"12.79.212.250"},
    {"id":49,"first_name":"Scott","last_name":"Heinish","email":"sheinish1c@4shared.com","gender":"Male","ip_address":"216.25.141.240"},
    {"id":50,"first_name":"Mariette","last_name":"Friatt","email":"mfriatt1d@flickr.com","gender":"Female","ip_address":"107.158.158.12"},
    {"id":51,"first_name":"Sebastiano","last_name":"Russan","email":"srussan1e@acquirethisname.com","gender":"Bigender","ip_address":"66.56.50.135"},
    {"id":52,"first_name":"Rey","last_name":"Tidy","email":"rtidy1f@netvibes.com","gender":"Female","ip_address":"5.29.57.121"},
    {"id":53,"first_name":"Livvie","last_name":"Capelow","email":"lcapelow1g@hc360.com","gender":"Female","ip_address":"149.150.227.66"},
    {"id":54,"first_name":"Lilith","last_name":"Cowton","email":"lcowton1h@icq.com","gender":"Female","ip_address":"98.30.65.153"},
    {"id":55,"first_name":"Giorgi","last_name":"Lattey","email":"glattey1i@hc360.com","gender":"Male","ip_address":"133.176.218.209"},
    {"id":56,"first_name":"Aldric","last_name":"Tire","email":"atire1j@hp.com","gender":"Male","ip_address":"24.231.29.23"},
    {"id":57,"first_name":"Kienan","last_name":"Beevers","email":"kbeevers1k@cdc.gov","gender":"Male","ip_address":"46.221.194.98"},
    {"id":58,"first_name":"Stanfield","last_name":"Pearcehouse","email":"spearcehouse1l@apache.org","gender":"Genderfluid","ip_address":"222.214.194.23"},
    {"id":59,"first_name":"Ros","last_name":"Layman","email":"rlayman1m@webs.com","gender":"Female","ip_address":"93.16.160.177"},
    {"id":60,"first_name":"Roldan","last_name":"Stringfellow","email":"rstringfellow1n@dedecms.com","gender":"Male","ip_address":"63.206.215.64"},
    {"id":61,"first_name":"Noble","last_name":"Tubb","email":"ntubb1o@whitehouse.gov","gender":"Male","ip_address":"242.65.204.177"},
    {"id":62,"first_name":"Berthe","last_name":"Olyunin","email":"bolyunin1p@sina.com.cn","gender":"Female","ip_address":"113.43.140.163"},
    {"id":63,"first_name":"Dionysus","last_name":"Marchetti","email":"dmarchetti1q@amazon.co.uk","gender":"Male","ip_address":"66.250.147.52"},
    {"id":64,"first_name":"Jeanine","last_name":"Matheson","email":"jmatheson1r@mozilla.org","gender":"Female","ip_address":"247.218.33.244"},
    {"id":65,"first_name":"Lurleen","last_name":"Jobes","email":"ljobes1s@scientificamerican.com","gender":"Female","ip_address":"95.57.81.34"},
    {"id":66,"first_name":"Buck","last_name":"Mewes","email":"bmewes1t@pinterest.com","gender":"Male","ip_address":"182.76.171.179"},
    {"id":67,"first_name":"Worth","last_name":"Tibald","email":"wtibald1u@imgur.com","gender":"Male","ip_address":"24.21.19.150"},
    {"id":68,"first_name":"Zola","last_name":"Whitley","email":"zwhitley1v@google.com","gender":"Female","ip_address":"20.152.53.18"},
    {"id":69,"first_name":"Lorain","last_name":"Castiglione","email":"lcastiglione1w@paypal.com","gender":"Female","ip_address":"170.157.196.82"},
    {"id":70,"first_name":"Rainer","last_name":"Riehm","email":"rriehm1x@edublogs.org","gender":"Male","ip_address":"227.199.26.6"},
    {"id":71,"first_name":"Eva","last_name":"Ziehm","email":"eziehm1y@paginegialle.it","gender":"Female","ip_address":"207.150.135.173"},
    {"id":72,"first_name":"Daryle","last_name":"Dyerson","email":"ddyerson1z@telegraph.co.uk","gender":"Male","ip_address":"217.14.120.207"},
    {"id":73,"first_name":"Haroun","last_name":"Yvon","email":"hyvon20@youtu.be","gender":"Male","ip_address":"190.168.123.87"},
    {"id":74,"first_name":"Emmet","last_name":"Frift","email":"efrift21@blogtalkradio.com","gender":"Male","ip_address":"217.221.238.49"},
    {"id":75,"first_name":"Babara","last_name":"Kitley","email":"bkitley22@icq.com","gender":"Female","ip_address":"223.89.32.168"},
    {"id":76,"first_name":"Lucienne","last_name":"Andreasen","email":"landreasen23@who.int","gender":"Female","ip_address":"198.121.241.36"},
    {"id":77,"first_name":"Hamilton","last_name":"Flaws","email":"hflaws24@businesswire.com","gender":"Male","ip_address":"70.197.67.48"},
    {"id":78,"first_name":"Felipe","last_name":"McGoon","email":"fmcgoon25@com.com","gender":"Male","ip_address":"0.146.5.176"},
    {"id":79,"first_name":"Allx","last_name":"Bewley","email":"abewley26@go.com","gender":"Female","ip_address":"148.242.213.86"},
    {"id":80,"first_name":"Portia","last_name":"Myring","email":"pmyring27@so-net.ne.jp","gender":"Female","ip_address":"131.86.24.202"},
    {"id":81,"first_name":"Tiebout","last_name":"Sedworth","email":"tsedworth28@comsenz.com","gender":"Bigender","ip_address":"103.28.39.146"},
    {"id":82,"first_name":"Calley","last_name":"Craster","email":"ccraster29@blogs.com","gender":"Female","ip_address":"22.184.131.254"},
    {"id":83,"first_name":"Reinold","last_name":"Shoulders","email":"rshoulders2a@nps.gov","gender":"Agender","ip_address":"36.237.94.153"},
    {"id":84,"first_name":"Cord","last_name":"Berdale","email":"cberdale2b@skype.com","gender":"Male","ip_address":"239.220.220.182"},
    {"id":85,"first_name":"Sig","last_name":"Owlner","email":"sowlner2c@weibo.com","gender":"Male","ip_address":"30.133.209.124"},
    {"id":86,"first_name":"Nydia","last_name":"Jervis","email":"njervis2d@amazon.de","gender":"Female","ip_address":"232.60.135.183"},
    {"id":87,"first_name":"Wilbert","last_name":"Bangley","email":"wbangley2e@google.com.br","gender":"Male","ip_address":"89.231.78.151"},
    {"id":88,"first_name":"Hadlee","last_name":"Greatreax","email":"hgreatreax2f@answers.com","gender":"Male","ip_address":"163.73.113.85"},
    {"id":89,"first_name":"Cherida","last_name":"McDougle","email":"cmcdougle2g@posterous.com","gender":"Female","ip_address":"241.159.216.212"},
    {"id":90,"first_name":"Ellen","last_name":"Oxford","email":"eoxford2h@blogger.com","gender":"Female","ip_address":"152.182.101.106"},
    {"id":91,"first_name":"Gannie","last_name":"Busen","email":"gbusen2i@upenn.edu","gender":"Male","ip_address":"246.187.147.244"},
    {"id":92,"first_name":"Trixy","last_name":"Lyon","email":"tlyon2j@ibm.com","gender":"Agender","ip_address":"85.85.185.55"},
    {"id":93,"first_name":"Ebony","last_name":"Cranna","email":"ecranna2k@exblog.jp","gender":"Female","ip_address":"254.7.130.250"},
    {"id":94,"first_name":"Ebeneser","last_name":"Spriggen","email":"espriggen2l@dailymail.co.uk","gender":"Male","ip_address":"186.87.213.67"},
    {"id":95,"first_name":"Thor","last_name":"Worton","email":"tworton2m@elpais.com","gender":"Male","ip_address":"250.127.126.169"},
    {"id":96,"first_name":"Rafi","last_name":"Keeling","email":"rkeeling2n@usatoday.com","gender":"Male","ip_address":"247.20.5.28"},
    {"id":97,"first_name":"Kacy","last_name":"McGroarty","email":"kmcgroarty2o@nbcnews.com","gender":"Female","ip_address":"7.108.169.29"},
    {"id":98,"first_name":"Winthrop","last_name":"Ranyard","email":"wranyard2p@hatena.ne.jp","gender":"Male","ip_address":"252.106.75.227"},
    {"id":99,"first_name":"Dorothea","last_name":"McAuliffe","email":"dmcauliffe2q@reverbnation.com","gender":"Female","ip_address":"42.183.78.147"},
    {"id":100,"first_name":"Ave","last_name":"Aspital","email":"aaspital2r@bigcartel.com","gender":"Male","ip_address":"230.62.147.232"}
    ];
  }, 1000);
});

const rowClick = (row, item) => {
  console.log(row, item);
  if (item.name === 'delete') {
    const index = data.value.findIndex(x => x.id === row.id);
    if (index !== -1) {
      setTimeout(() => {
        data.value.splice(index, 1);
      }, 1000);
    }
  }
}
</script>

<template>
  <main class="flex flex-col gap-8 p-8">
    <section class="container mx-auto">
      <div>
        <h1 class="text-xl font-bold">Advanced data table made with Vue.js 3.x</h1>
        <p>This data table is a simple and easy-to-use data table component made with Vue.js 3.x. The data table component in Vuetify 3 hasn’t been released yet, so i made this component by referring to the API and UI of data table component in Vuetify 2.</p>
        <h2>Features</h2>
        <ul>
          <li>Searchable</li>
          <li>Sortable</li>
          <li>Filterable</li>
          <li>Customizable</li>
        </ul>
      </div>
    </section>

    <section>
      <TableData caption="Full featured table" :rowClick="rowClick" :data="data" :columns="header" :searchable="true" :showFooter="true">
        <template #afterHeader>
          <tr>
            <td :colspan="header.length" class="border-t border-b p-4">
              <h3>Legend:</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora eius quia accusamus recusandae quo repellendus labore nemo totam consequatur impedit praesentium, laudantium facilis debitis iure consequuntur harum animi distinctio!</p>
            </td>
          </tr>
        </template>

        <template #beforeFooter>
          <tr>
            <td :colspan="header.length" class="border-t border-b p-4">
              <h3>Legend:</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora eius quia accusamus recusandae quo repellendus labore nemo totam consequatur impedit praesentium, laudantium facilis debitis iure consequuntur harum animi distinctio!</p>
            </td>
          </tr>
        </template>
      </TableData>
    </section>

    <section>
      <TableData caption="Basic table" :data="data"></TableData>
    </section>
  </main>
</template>

<style>
.dataTableWrapper {
  @apply border rounded-lg shadow;
}
.dataTableCaption {
  @apply flex flex-col lg:flex-row items-center justify-between gap-4 p-4 border-b
}
.dataTableCaption p {
  @apply text-2xl font-bold
}
</style>
