import React, { Component } from 'react';
import '../../assets/css/spell/Spell.css';

class Spell extends Component {

    formatTime = (value) => {
        let words = value.split(',');
        return words[0];
    }

    formatLevel = (value) => {
        if (value === "0") {
            return <b>C</b>;
        }
        return value;
    }

    hasRitual = (value) => {
        if (value === '1') {
            return <div className="icon">R</div>;
        }
        return "";
    }
    hasConcentration = (value) => {
        let search = value.toLowerCase();
        if (search.includes("concentration")) {
            return <div className="icon">C</div>;
        }
        return "";
    }


    formatComponents = (value) => {
        let words = value.split('(');
        if (words.length > 1) {
            return words[0] + "*";
        }
        return words[0];
    }

    formatDuration = (value) => {
        let search = value.toLowerCase();
        if (search.includes("concentration")) {
            if (search.includes("concentration, ")) {
                let words = value.replace("Concentration, ", "");
                return words;
            } else {
                let words = value.replace("Concentration", "");
                return words;
            }
        }
        return value;
    }

    formatDurationIcon = (value) => {
        let search = value.toLowerCase();
        if (search.includes("concentration")) {
            if (search.includes("concentration, ")) {
                return <img className="icon" src="" alt="Conc." />;
            } else {
                return <img className="icon" src="" alt="Conc." />;
            }
        }
        return '';
    }

    formatConstlyIcon = (value) => {
        let search = value.match("(\\d+\\sgp)|(\\d+,\\d+\\sgp)");
        if (search != null) {
            return <img className="icon" src="" alt="Conc." />
        }

        return '';
    }

    render() {
        return (
            <div className="spell" style={{ animationDelay: `${this.props.delay * 50}ms` }} onClick={this.props.onClick}>
                <div className="spellName spellAttr"><b>{this.props.spell.name}</b></div>
            </div>
        )
    }
}

export default Spell;