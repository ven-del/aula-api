// URLs da API do IBGE
const URL_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const URL_MUNICIPIOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios';

// Elementos do DOM
const selectEstados = document.getElementById('estados');
const selectCidades = document.getElementById('cidades');
const divMunicipios = document.getElementById('municipios');
const divResultado = document.getElementById('info-resultado');

// Função para carregar os estados
async function carregarEstados() {
    try {
        // Fazendo a requisição para a API do IBGE
        const response = await fetch(URL_ESTADOS);
        
        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar estados: ${response.status}`);
        }
        
        // Convertendo a resposta para JSON
        const estados = await response.json();
        
        // Ordenando os estados por nome
        estados.sort((a, b) => a.nome.localeCompare(b.nome));
        
        // Limpando o select de estados
        selectEstados.innerHTML = '<option value="">Selecione um estado</option>';
        
        // Adicionando os estados ao select
        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.sigla;
            option.textContent = estado.nome;
            selectEstados.appendChild(option);
        });
        
        console.log('Estados carregados com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar estados:', error);
        selectEstados.innerHTML = '<option value="">Erro ao carregar estados</option>';
    }
}

// Função para carregar os municípios de um estado
async function carregarMunicipios(uf) {
    try {
        // Mostrando a div de municípios
        divMunicipios.style.display = 'block';
        
        // Substituindo o placeholder {UF} pela sigla do estado selecionado
        const url = URL_MUNICIPIOS.replace('{UF}', uf);
        
        // Fazendo a requisição para a API do IBGE
        const response = await fetch(url);
        
        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar municípios: ${response.status}`);
        }
        
        // Convertendo a resposta para JSON
        const municipios = await response.json();
        
        // Ordenando os municípios por nome
        municipios.sort((a, b) => a.nome.localeCompare(b.nome));
        
        // Limpando o select de municípios
        selectCidades.innerHTML = '<option value="">Selecione um município</option>';
        
        // Adicionando os municípios ao select
        municipios.forEach(municipio => {
            const option = document.createElement('option');
            option.value = municipio.id;
            option.textContent = municipio.nome;
            selectCidades.appendChild(option);
        });
        
        console.log(`Municípios do estado ${uf} carregados com sucesso!`);
    } catch (error) {
        console.error('Erro ao carregar municípios:', error);
        selectCidades.innerHTML = '<option value="">Erro ao carregar municípios</option>';
    }
}

// Função para mostrar as informações selecionadas
function mostrarInformacoes() {
    const estadoSelecionado = selectEstados.options[selectEstados.selectedIndex];
    const cidadeSelecionada = selectCidades.options[selectCidades.selectedIndex];
    
    let html = '';
    
    if (estadoSelecionado && estadoSelecionado.value) {
        html += `<p><strong>Estado:</strong> ${estadoSelecionado.text} (${estadoSelecionado.value})</p>`;
    }
    
    if (cidadeSelecionada && cidadeSelecionada.value) {
        html += `<p><strong>Município:</strong> ${cidadeSelecionada.text} (ID: ${cidadeSelecionada.value})</p>`;
    }
    
    divResultado.innerHTML = html || '<p>Nenhuma informação selecionada</p>';
}

// Event Listeners
selectEstados.addEventListener('change', function() {
    const uf = this.value;
    
    if (uf) {
        carregarMunicipios(uf);
    } else {
        divMunicipios.style.display = 'none';
        selectCidades.innerHTML = '<option value="">Selecione um estado primeiro</option>';
    }
    
    mostrarInformacoes();
});

selectCidades.addEventListener('change', mostrarInformacoes);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarEstados();
});