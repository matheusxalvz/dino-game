const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let pontuacao = document.querySelector(".pontos");
let isJumping = false;
let position = 0;
let pontos = 0

function handlerKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
        jump();
    }
    }
}

function jump(){
    
    isJumping = true;
    let upInterval = setInterval(()=>{
        if(position >= 150){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                    
                }else{
                position -= 20;
                dino.style.bottom = position + "px";               
            
            }

            },20)
        }else{
            position += 20;
            dino.style.bottom = position + "px";
        }
    }
    ,20)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px"
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{      

        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            pontos += 1;
            pontuacao.innerHTML = `Pontuação : ${pontos}`;
            
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60 ){
            clearInterval(leftInterval);
            document.body.innerHTML = `<span class="fim"> Fim de jogo <br> Pontuação : </span> ${pontos}<br> <span> Aperte espaço para começar novamente </span> `;
            document.addEventListener("keyup", (event)=>{
                if(event.keyCode === 32){
                    document.location.reload(true);
                }
            });
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    },20);
    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener("keyup", handlerKeyUp);
