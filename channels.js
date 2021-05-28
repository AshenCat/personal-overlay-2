const rendererToMain = [
    "windowState",
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarEvents",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint"
]

const mainToRenderer = [
    "onEventAdd",
    "onSprintAdd",
    "LoadSprints",
    "LoadCalendarEvents",
    "LoadSprint",
    "EditSprint",
    "DeleteSprint"
]

module.exports = {
    rendererToMain,
    mainToRenderer
}