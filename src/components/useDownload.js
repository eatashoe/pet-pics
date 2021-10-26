function useDownload(){
    function download(e,links,titles){
        e.stopPropagation();
        if(links.length > 1){
            // for(let i = 0; i < links.length; i++){
            //     fetch(links[i])
            //     .then((response) => response.blob())
            //     .then((blob) => {
            //         const url = window.URL.createObjectURL(
            //             new Blob([blob]),
            //         );
            //         const link = document.createElement('a');
            //         link.href = url;
            //         link.setAttribute(
            //             'download',
            //             titles[i]+".png",
            //         );
            //         document.body.appendChild(link);
            //         link.click();
            //         link.parentNode.removeChild(link);
            //     });
            // }

            console.log(links.length);
            Promise.all(links.map(url =>fetch(url)))
            .then(responses => Promise.all(
                responses.map(res => res.blob())))
            .then(blobs => { 
                download_files(blobs,titles);
            });

            // download_files(links)
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

    function download_files(files,titles) {
        function download_next(i) {
          if (i >= files.length) {
            return;
          }
          const url = window.URL.createObjectURL(
            new Blob([files[i]]),
          );
          var a = document.createElement('a');
          a.href = url;
          a.setAttribute(
            'download',
            titles[i]+".png",
        );
          (document.body || document.documentElement).appendChild(a);
          if (a.click) {
            a.click(); 
          }
          a.parentNode.removeChild(a);
          setTimeout(function() {
            download_next(i + 1);
          }, 500);
        }
        download_next(0);
      }
    return download;
}

export default useDownload;