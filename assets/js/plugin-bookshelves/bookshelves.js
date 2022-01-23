{{ with .Scratch.Get "plugin-bookshelves.Parameters" -}}

document.addEventListener('DOMContentLoaded', () => {
  
  let bookshelves = document.querySelector('#{{ .Style.BookshelvesID }}');
  let listViewButton = document.querySelector('#{{ .Style.ListViewButtonID }}');
  let gridViewButton = document.querySelector('#{{ .Style.GridViewButtonID }}');
  
  listViewButton.onclick = () => {
    bookshelves.classList.replace('grid', 'list');
    listViewButton.classList.add('{{ .Style.ActiveButtonClassName }}');
    gridViewButton.classList.remove('{{ .Style.ActiveButtonClassName }}');
  };
  
  gridViewButton.onclick = () => {
    bookshelves.classList.replace('list', 'grid');
    gridViewButton.classList.add('{{ .Style.ActiveButtonClassName }}');
    listViewButton.classList.remove('{{ .Style.ActiveButtonClassName }}');
  };
  
});

{{- end }}