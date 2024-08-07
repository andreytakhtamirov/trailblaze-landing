import Sniffr from 'sniffr';

export function getOS() {
    const s = new Sniffr();
    s.sniff();

    if (s.os.name === 'macos' || s.os.name === 'ios') {
        return 'ios';
    } else if (s.os.name === 'windows' || s.os.name === 'android') {
        return 'android';
    } else {
        return 'other';
    }
}
