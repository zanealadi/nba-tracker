import teams from '../data/teams'

function TeamSearch({ onTeamSelect }) {
  return (
    <div className="team-search">
        <select onChange={(e) => {
        const team = teams.find(t => t.id === Number(e.target.value))
        if (team) onTeamSelect(team)
        }}>
        <option value="">Select a team...</option>
        {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
        ))}
        </select>
    </div>
  )
}

export default TeamSearch