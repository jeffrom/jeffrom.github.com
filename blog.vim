let SessionLoad = 1
if &cp | set nocp | endif
map  h
let s:cpo_save=&cpo
set cpo&vim
map <NL> j
map  k
map  l
vmap <silent> ,) c(")
vmap <silent> ,( c(")
vmap <silent> ," c"""
vmap <silent> ,' c'"'
map <silent> ,)$ $i)
map <silent> ,"$ $i"
map <silent> ,)% c%(")
map <silent> ,)W ciW(")
map <silent> ,)w ciw(")
map <silent> ,(% c%(")
map <silent> ,(W ciW(")
map <silent> ,(w ciw(")
map <silent> ,"w ciw"""
map <silent> ,'w ciw'"'
map <silent> ,"W ciW"""
map <silent> ,'W ciW'"'
map <silent> ,m :call CleanMustaches()
map <silent> ,j :call ReadJson()
vmap ,b :!svn blame =expand("%:p")  | sed -n =line("'<") ,=line("'>") p 
map <silent> ,r :call CursorGrep()
map <silent> ,, :set hlsearch! hlsearch?
nnoremap ; :
nnoremap Y y$
vmap [% [%m'gv``
vmap ]% ]%m'gv``
vmap a% [%v]%
nmap gx <Plug>NetrwBrowseX
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#NetrwBrowseX(expand("<cWORD>"),0)
map <F9> :only:below vnew:read !svn diff:set syntax=diff buftype=nofile bufhidden=deletegg
imap jj 
let &cpo=s:cpo_save
unlet s:cpo_save
set backspace=2
set backup
set backupdir=~/.vim/backup
set directory=~/.vim/backup
set expandtab
set fileencodings=ucs-bom,utf-8,default,latin1
set helplang=en
set hidden
set incsearch
set modelines=0
set omnifunc=htmlcomplete#CompleteTags
set scrolloff=3
set shiftwidth=4
set tabstop=4
set tags=./tags;/Users/jeffreymartin,./stdlib.tags;/Users/jeffreymartin,./shared.tags;/Users/jeffreymartin
set undofile
set window=0
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +22 blog/_includes/head.html
badd +84 blog/_includes/main.css
badd +3 blog/_includes/posts.html
badd +2 blog/_layouts/default.html
badd +36 blog/_layouts/post.html
badd +9 blog/index.html
silent! argdel *
edit blog/index.html
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
setlocal noautoindent
setlocal nobinary
setlocal bufhidden=
setlocal buflisted
setlocal buftype=
setlocal nocindent
setlocal cinkeys=0{,0},0),:,0#,!^F,o,O,e
setlocal cinoptions=
setlocal cinwords=if,else,while,do,for,switch
setlocal colorcolumn=
setlocal comments=s:<!--,m:\ \ \ \ ,e:-->
setlocal commentstring=<!--%s-->
setlocal complete=.,w,b,u,t,i
setlocal completefunc=
setlocal nocopyindent
setlocal cryptmethod=
setlocal nocursorbind
setlocal nocursorcolumn
setlocal nocursorline
setlocal define=
setlocal dictionary=
setlocal nodiff
setlocal equalprg=
setlocal errorformat=
setlocal expandtab
if &filetype != 'html'
setlocal filetype=html
endif
setlocal foldcolumn=0
setlocal foldenable
setlocal foldexpr=0
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldmarker={{{,}}}
setlocal foldmethod=manual
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldtext=foldtext()
setlocal formatexpr=
setlocal formatoptions=tcq
setlocal formatlistpat=^\\s*\\d\\+[\\]:.)}\\t\ ]\\s*
setlocal grepprg=
setlocal iminsert=0
setlocal imsearch=0
setlocal include=
setlocal includeexpr=
setlocal indentexpr=HtmlIndentGet(v:lnum)
setlocal indentkeys=o,O,*<Return>,<>>,{,}
setlocal noinfercase
setlocal iskeyword=@,48-57,_,192-255
setlocal keywordprg=
setlocal nolinebreak
setlocal nolisp
setlocal nolist
setlocal makeprg=
setlocal matchpairs=(:),{:},[:],<:>
setlocal modeline
setlocal modifiable
setlocal nrformats=octal,hex
setlocal nonumber
setlocal numberwidth=4
setlocal omnifunc=htmlcomplete#CompleteTags
setlocal path=
setlocal nopreserveindent
setlocal nopreviewwindow
setlocal quoteescape=\\
setlocal noreadonly
setlocal norelativenumber
setlocal noscrollbind
setlocal shiftwidth=4
setlocal noshortname
setlocal nosmartindent
setlocal softtabstop=0
setlocal nospell
setlocal spellcapcheck=
setlocal spellfile=
setlocal spelllang=en
setlocal statusline=
setlocal suffixesadd=
setlocal swapfile
setlocal synmaxcol=3000
if &syntax != 'html'
setlocal syntax=html
endif
setlocal tabstop=4
setlocal tags=
setlocal textwidth=0
setlocal thesaurus=
setlocal undofile
setlocal nowinfixheight
setlocal nowinfixwidth
setlocal wrap
setlocal wrapmargin=0
silent! normal! zE
let s:l = 9 - ((8 * winheight(0) + 17) / 35)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
9
normal! 0
lcd ~/
tabnext 1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
