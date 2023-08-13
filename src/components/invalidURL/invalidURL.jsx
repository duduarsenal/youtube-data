export default function InvalidURL(props) {
    function setInvalid(){
        props.setInvalidChannel(false)
        props.setSiteClickabe(true)
    }
    return ( 
        <section className={`${props.invalidChannel ? 'flex' : 'hidden'} fixed z-10 w-full h-full bg-[#11111195] items-center justify-center`}>
            <div className="relative w-[25rem] h-[10rem] bg-[white] rounded-lg p-4 flex flex-col items-center justify-start pt-8">
                <p className="text-[black] text-[1.25rem] font-semibold">Usuário/URL Inválido</p>
                <p className="text-[black] text-[1.15rem]">Digite o Usuário ou o Link novamente</p>
                <button type="submit" className="absolute w-[30%] bg-[#1f1f1f] px-4 py-2 rounded-lg bottom-0 right-0 m-4 hover:bg-[#111111]" 
                onClick={() => setInvalid()}>Fechar</button>
            </div>
        </section>
     );
}