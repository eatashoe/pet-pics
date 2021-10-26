function useDownload(){
    function download(e,links,titles){
        e.stopPropagation();
        if(links.length > 1){
            for(let i = 0; i < links.length; i++){
                fetch(links[i])
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                        new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        titles[i]+".png",
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
            }
        }
        else{
            fetch(links)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    titles+".png",
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
        }
    }
    return download;
}

export default useDownload;