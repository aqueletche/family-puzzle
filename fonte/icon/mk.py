# gera ícone: 4 peças de quebra-cabeça encaixadas (família de 4 rostinhos)
O, S = 18, 32  # origem e tamanho da peça (grade 2x2 => 18..82)
R = 6.5         # raio do encaixe
def edge(x1,y1,x2,y2,t):
    # t: 0 reto, +1 saliência à esquerda da direção, -1 à direita
    if t==0: return f"L{x2},{y2} "
    mx,my=(x1+x2)/2,(y1+y2)/2; dx,dy=(x2-x1)/S,(y2-y1)/S
    nx,ny=dy*t,-dx*t  # normal
    a=(mx-dx*R,my-dy*R); b=(mx+dx*R,my+dy*R)
    sweep = 1 if t>0 else 0
    return f"L{a[0]:.2f},{a[1]:.2f} A{R},{R} 0 1 {sweep} {b[0]:.2f},{b[1]:.2f} L{x2},{y2} "
def piece(c,r,tabs):
    x,y=O+c*S,O+r*S
    p=f"M{x},{y} "
    p+=edge(x,y,x+S,y,tabs[0]); p+=edge(x+S,y,x+S,y+S,tabs[1]); p+=edge(x+S,y+S,x,y+S,tabs[2]); p+=edge(x,y+S,x,y,tabs[3])
    return p+"Z"
# arestas internas: vertical entre col0/col1 (linhas 0,1) e horizontal entre linha0/linha1
# para peça (0,0): direita sai (+), baixo entra; etc.  sinal: aresta percorrida no sentido horário, saliência p/ fora = t=-1? testamos visualmente
OUT,IN=-1,1
pcs={(0,0):[0,OUT,IN,0],(1,0):[0,0,OUT,IN],(0,1):[OUT,IN,0,0],(1,1):[IN,0,0,OUT]}
cols={(0,0):'#ff5c8a',(1,0):'#2f9bff',(0,1):'#ffc531',(1,1):'#33d17a'}
svg=["<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>",
"<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#5b3fd6'/><stop offset='1' stop-color='#2a1b6b'/></linearGradient></defs>",
"<rect width='100' height='100' rx='22' fill='url(#g)'/>",
"<g stroke='#1b1340' stroke-width='2.2' stroke-linejoin='round'>"]
for k,t in pcs.items(): svg.append(f"<path d='{piece(*k,t)}' fill='{cols[k]}'/>")
svg.append("</g>")
# rostinhos (adultos em cima maiores, crianças embaixo)
faces={(0,0):1,(1,0):1,(0,1):.8,(1,1):.8}
for (c,r),s in faces.items():
    cx,cy=O+c*S+S/2+(-2 if c==0 else 2),O+r*S+S/2+(-1 if r==0 else 2)
    e=4.2*s; svg.append(f"<circle cx='{cx-e:.1f}' cy='{cy-2*s:.1f}' r='{2.1*s:.1f}' fill='#1b1340'/><circle cx='{cx+e:.1f}' cy='{cy-2*s:.1f}' r='{2.1*s:.1f}' fill='#1b1340'/>")
    svg.append(f"<path d='M{cx-4.5*s:.1f},{cy+3*s:.1f} Q{cx},{cy+8*s:.1f} {cx+4.5*s:.1f},{cy+3*s:.1f}' fill='none' stroke='#1b1340' stroke-width='{2.2*s:.1f}' stroke-linecap='round'/>")
    svg.append(f"<circle cx='{cx-8*s:.1f}' cy='{cy+3*s:.1f}' r='{2*s:.1f}' fill='#fff' opacity='.35'/><circle cx='{cx+8*s:.1f}' cy='{cy+3*s:.1f}' r='{2*s:.1f}' fill='#fff' opacity='.35'/>")
# coraçãozinho central
svg.append("<path transform='translate(50 50.5) scale(.62) translate(-12 -12)' d='M12 21.3 L10.6 20 C5.4 15.4 2 12.3 2 8.5 C2 5.4 4.4 3 7.5 3 C9.2 3 10.9 3.8 12 5.1 C13.1 3.8 14.8 3 16.5 3 C19.6 3 22 5.4 22 8.5 C22 12.3 18.6 15.4 13.4 20 Z' fill='#fff' stroke='#1b1340' stroke-width='2.6' stroke-linejoin='round'/>")
svg.append("</svg>")
open('icon.svg','w').write(''.join(svg))
