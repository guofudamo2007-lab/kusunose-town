const movie=document.querySelector('#movie')
const rainFilm=document.querySelector('#rain-film')
movie.addEventListener('play',()=>rainFilm.pause())
rainFilm.addEventListener('play',()=>movie.pause())
const chapters=[...document.querySelectorAll('[data-time]')]
for(const chapter of chapters){
 chapter.addEventListener('click',async()=>{
   if(movie.readyState===0) await new Promise(resolve=>movie.addEventListener('loadedmetadata',resolve,{once:true}))
   movie.currentTime=Number(chapter.dataset.time)
   try{await movie.play()}catch{movie.focus()}
 })
}
movie.addEventListener('timeupdate',()=>{
 const current=chapters.filter(b=>Number(b.dataset.time)<=movie.currentTime+.15).at(-1)
 for(const b of chapters){if(b===current)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')}
})
const roster=document.querySelector('#roster')
function show(r){
 document.querySelector('#portrait').src='assets/'+r.id+'.png'
 for(const key of ['name','clock','thought'])document.querySelector('#'+key).textContent=key==='thought'?'「'+r.thought+'」':r[key]
 document.querySelector('#job').textContent=r.occupation
 for(const button of roster.children)button.setAttribute('aria-pressed',String(button.dataset.id===r.id))
}
for(const resident of window.townResidents){
 const button=document.createElement('button');button.type='button';button.dataset.id=resident.id
 const image=new Image();image.alt='';image.src='assets/'+resident.id+'.png'
 button.append(image,document.createTextNode(resident.name));button.onclick=()=>show(resident);roster.append(button)
}
show(window.townResidents[0])
