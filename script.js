document.addEventListener('DOMContentLoaded', function () {
  const perPageSelect = document.getElementById('perPage');
  const repositoryList = document.getElementById('repositoryList');

  perPageSelect.addEventListener('change', fetchData);

  async function fetchData() {
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=created:2019-01-10&sort=stars&order=desc`);
      const data = await response.json();
      renderRepositoryList(data.items.slice(0, +perPageSelect.value));
    } catch (error) {
      console.error(error);
    }
  }

  function renderRepositoryList(repositories) {
    repositoryList.innerHTML = '';

    repositories.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${repo.name}</strong> - ${repo.description} (${repo.stargazers_count} stars)`;
      repositoryList.appendChild(li);
    });
  }

  fetchData();
});
