const provinsiSelect=document.getElementById("provinsi"),radarFrame=document.getElementById("radar"),statusText=document.getElementById("status"),updateText=document.getElementById("update"),gempaList=document.getElementById("gempaList");

// Load provinsi
fetch("provinsi.json").then(res=>res.json()).then(data=>{
  for(let prov in data){
    const opt=document.createElement("option");opt.value=prov;opt.textContent=prov;provinsiSelect.appendChild(opt);
  }
  provinsiSelect.addEventListener("change",()=>{
    const prov=provinsiSelect.value;if(!prov)return;
    radarFrame.src=data[prov].radar;
    statusText.textContent="Menampilkan radar cuaca "+prov;
    updateText.textContent="Update: "+new Date().toLocaleString("id-ID");
  });
}).catch(err=>console.error("Gagal memuat provinsi:",err));

// Load gempa terkini
async function fetchGempa(){
  const url="https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json";
  try{
    const res=await fetch(url);
    const data=await res.json();
    const list=(data.Infogempa.gempa||[]).slice(0,15);
    gempaList.innerHTML="";
    list.forEach(g=>{
      const div=document.createElement("div");div.className="item";
      div.innerHTML=`<strong>${g.Wilayah}</strong> - M: ${g.Magnitude} - ${g.Tanggal} ${g.Jam}`;
      gempaList.appendChild(div);
    });
  }catch(e){gempaList.textContent="Gagal memuat data gempa";console.error(e);}
}
fetchGempa();setInterval(fetchGempa,10*60*1000);
